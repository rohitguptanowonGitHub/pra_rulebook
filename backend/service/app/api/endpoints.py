from fastapi import APIRouter, HTTPException
import nltk

from app.core.functions import get_chunks, embed_query_chunk, vector_search, llm_call, embed_sparse_query_chunk, hybrid_search, map_reduce_summarize
import warnings
nltk.download('punkt')
warnings.filterwarnings("ignore")

import sys
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Add the root directory of your project to the PYTHONPATH
sys.path.append(os.getenv('PYTHONPATH'))


router = APIRouter()

@router.post("/process")
async def process_input(input_value: str):
    try:

        #Article Search
        file_path = os.path.join(os.getenv('PYTHONPATH'), 'app', 'dependencies', 'extracted_tables.csv')
        sys_msg  = "Extract only the Articles mentioned in the given text along with their corresponding Point references as a Python list. Include references such as 'Point (x) of Article 12 CRR'. If an Article is mentioned without a Point reference, include only the Article. If no Articles are present, check for references in parentheses. If still no Articles are found, return a blank list with no additional text. Ensure each list item starts with 'Article' if it is missing."
        chunks, _ = get_chunks(file_path)
        q_embedding = embed_query_chunk(input_value)
        page_content = vector_search(q_embedding,chunks,os.getenv('ARTICLE_INDEX'))
        articles = llm_call(page_content,sys_msg)
        print(articles)
        print(page_content)
        # Extract substring between "|"
        start = page_content.find("|") + 1
        end = page_content.rfind("|")
        if start > 0 and end > start:
            warning = page_content[start:end]
        #Get Article Definition
        article_list = eval(articles)
              
        if len(article_list) != 0:
            article_def = article_list[0]

            # file_path1 = os.path.join(os.getenv('PYTHONPATH'), 'app', 'dependencies', "chunks_rulebook.csv")
            # chunks1 = get_chunks(file_path1)
            # q_embedding1 = embed_query_chunk(article_def)
            # page_content1 = vector_search(q_embedding1,chunks1,os.getenv('RULEBOOK_INDEX'))
            
            file_path1 = os.path.join(os.getenv('PYTHONPATH'), 'app', 'dependencies', "pra_regulation_s7.csv")
            
            _, bm25_encoder = get_chunks(file_path1, True)
            q_embedding1 = embed_query_chunk(article_def)
            s_q_embedding = embed_sparse_query_chunk(article_def, bm25_encoder)
            page_content1 = hybrid_search(q_embedding1, s_q_embedding, os.getenv('PRA_RULEBOOK_INDEX'))
            #print(f'PRA Rulebook - Annex 2 Ref: {page_content1}')

            #Hybrid search the PRA_RULEBOOK_INDEX with title
            q_embedding_title = embed_query_chunk(input_value)
            s_q_embedding_title = embed_sparse_query_chunk(input_value, bm25_encoder)
            relevant_chunk_title = hybrid_search(q_embedding_title, s_q_embedding_title, os.getenv('PRA_RULEBOOK_INDEX'))
            #print(f'PRA Rulebook - Title: {relevant_chunk_title}')

            #Get the article ref from the title from PRA Rulebook
            print(relevant_chunk_title)
            addnl_articles = llm_call(relevant_chunk_title,sys_msg)
            print(addnl_articles)
            addnl_articles_list = eval(addnl_articles)

            #Get QnA
            # file_path2 = os.path.join(os.getenv('PYTHONPATH'), 'app', 'dependencies', 'qna_tables.csv')
            # chunks2, _ = get_chunks(file_path2)
            # q_embedding2 = embed_query_chunk(article_def)
            # page_content2 = vector_search(q_embedding2,chunks2,os.getenv('QNA_INDEX'))

            #Get QnA using Hybrid Search
            qna_file_path = os.path.join(os.getenv('PYTHONPATH'), 'app', 'dependencies', 'qna_tables_v2.csv')
            _, qna_bm25_encoder = get_chunks(qna_file_path, True)
            qna_embedding_title = embed_query_chunk(article_def)
            s_qna_embedding_title = embed_sparse_query_chunk(article_def, qna_bm25_encoder)
            page_content2 = hybrid_search(qna_embedding_title, s_qna_embedding_title, os.getenv('QNA_INDEX'),3)
            #print(f'PRA Rulebook - Title: {relevant_chunk_title}')
            #print(len(page_content2))
        
            
            #Get the QnA ref from page_content2 chunk
            qna_ref_list = []
            sys_msg = "Extract only the Question ID mentioned in the given text. If no Question ID is present then return a blank value with no additional text. Ensure that output has text 'Question_ID' not 'Question ID' appended in prefix if it is missing. "
            for qa in page_content2:
                qna_ref = llm_call(qa,sys_msg)
                print(qna_ref)
                qna_ref_list.append(qna_ref)
            # Remove duplicates from qna_ref_list
            qna_ref_list = list(set(qna_ref_list))
            print(f'QnA Ref: {qna_ref_list}')

            #Summarize the QnA using Langchain Map Reduce
            qna_summary = map_reduce_summarize(page_content2)
            
            #Final LLM Call
            final_sys_msg = """Context: You are an AI financial regulator modeled after a seasoned expert in the field of banking and finance. Your expertise encompasses a deep understanding of the European Banking Authority (EBA) regulations and the Prudential Regulation Authority (PRA) rules. Your role involves analyzing complex regulatory texts and providing interpretations that are both accurate and comprehensible to a diverse audience, including financial institutions, compliance officers, and other stakeholders within the banking sector.
 
                            As a regulator, you are expected to navigate through intricate legal frameworks and offer guidance that helps stakeholders comply with regulatory requirements. Your interpretations must be grounded in the legal text but also practical, taking into account real-world applications of these rules. You are adept at identifying the essence of regulatory provisions and translating them into plain language without losing the nuance of the original text.
 
                            Task: Provide interpretations of specific regulatory items from the PRA rulebook. Your interpretations should be concise, jargon-free, and follow a structured format for ease of understanding.
 
                            Example Format:
                            Interpretation: '[Your interpretation here]'
                            
                            Instructions:
                            1. Use the 'regulation rules' from the PRA rulebook as your primary source of information. Make use of Article Definition and Article Reference as per Title for additional context.
                            2. Refer to the 'eba qna data' only for additional context or clarification when necessary.
                            3. Avoid using technical jargon, row references, or line references in your interpretations.
                            4. Present your interpretation in a logical sequence that is easy to follow.
                            5. Adhere to any explicit rules or exceptions mentioned in the 'Warnings' section.
                            6. Ensure that your interpretation is compliant with both the letter and the spirit of the regulations.
                            7. The output should only consists of clear and concise and short points like '1.', '2.' etc and not paragragh, each point should be very short but shouldnt lose the context and add '\n' after end of each point.  
                            8. The interpretation should first focus on the regulations rules and not the entire text. Then it should relate that to EBA Q&A details only for any additional rule change/update. Do not use wordings from eba QnA until very explicitly required or mapped with PRA rules.  
                            9. Do not give explanation of the title which we are providing, just give the interpretation using the regulations rules.
                        
 
                            
                            Data Sources:
                            - Item value:'[Reference should be taken from the key "Title" in the user query]'
                            - Regulation Rules: '[Take this value from the key "Article" in the user query]'
                            - EBA Q&A Details: '[Take this value from the key "Reference QnA" in the user query]'
                            - Regulation Rule as per Title: '[Take this value from the key "Article Reference as per Title" in the user query]'
                            
                            
                            Your Interpretation*:
                            - Interpretation: '[Provide your interpretation here, ensuring it is clear and adheres to the instructions above]"""
                


            final_page_content = f"Title : {input_value}, Article : {article_def}, Article Definition : {page_content1}, Article Reference as per Title : {relevant_chunk_title},  Reference QnA : {qna_summary} and give Interpretation in the similar format as provided in the system message. The Interpretation should be easy to understand by a layman and should be well structured. Remove references of any articles in the response."

            result = llm_call(final_page_content,final_sys_msg)
            articles = "\n".join(article_list)
            addnl_articles = "\n".join(addnl_articles_list)
            qna_ref_list = "\n".join(qna_ref_list)

        else:
                articles = "NA" 
                result = "Interpretation not applicable"
                warning = ""
                addnl_articles_list = ""
                qna_ref_list = ""


        return {"output": result, "articles":articles, "warning":warning, "additional_articles":addnl_articles, "qna_refs":qna_ref_list}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))