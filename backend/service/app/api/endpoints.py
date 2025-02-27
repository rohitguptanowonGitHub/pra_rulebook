from fastapi import APIRouter, HTTPException

from app.core.functions import get_chunks, embed_query_chunk, vector_search, llm_call
import warnings
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
        chunks = get_chunks(file_path)
        q_embedding = embed_query_chunk(input_value)
        page_content = vector_search(q_embedding,chunks,"csai")
        articles = llm_call(page_content,sys_msg)
        print(articles)
        print(page_content)
        # Extract substring between "|"
        start = page_content.find("|") + 1
        end = page_content.rfind("|")
        if start > 0 and end > start:
            warning = page_content[start:end]
        warning = "Article Reference: "+ warning
        #Get Article Definition
        article_list = eval(articles)
              
        if len(article_list) != 0:
            article_def = article_list[0]
            file_path1 = os.path.join(os.getenv('PYTHONPATH'), 'app', 'dependencies', "chunks_rulebook.csv")
            chunks1 = get_chunks(file_path1)
            q_embedding1 = embed_query_chunk(article_def)
            page_content1 = vector_search(q_embedding1,chunks1,"regulation")

            #Get QnA
            file_path2 = os.path.join(os.getenv('PYTHONPATH'), 'app', 'dependencies', 'qna_tables.csv')
            chunks2 = get_chunks(file_path2)
            q_embedding2 = embed_query_chunk(article_def)
            page_content2 = vector_search(q_embedding2,chunks2,"qna")
                
            #Final LLM Call
            final_sys_msg = """Context: You are an AI financial regulator modeled after a seasoned expert in the field of banking and finance. Your expertise encompasses a deep understanding of the European Banking Authority (EBA) regulations and the Prudential Regulation Authority (PRA) rules. Your role involves analyzing complex regulatory texts and providing interpretations that are both accurate and comprehensible to a diverse audience, including financial institutions, compliance officers, and other stakeholders within the banking sector.
 
As a regulator, you are expected to navigate through intricate legal frameworks and offer guidance that helps stakeholders comply with regulatory requirements. Your interpretations must be grounded in the legal text but also practical, taking into account real-world applications of these rules. You are adept at identifying the essence of regulatory provisions and translating them into plain language without losing the nuance of the original text.
 
Task: Provide interpretations of specific regulatory items from the PRA rulebook. Your interpretations should be concise, jargon-free, and follow a structured format for ease of understanding.
 
Example Format:
Interpretation: '[Your interpretation here]'
 
Instructions:
1. Use the 'regulation rules' from the PRA rulebook as your primary source of information.
2. Refer to the 'eba qna data' only for additional context or clarification when necessary.
3. Avoid using technical jargon, row references, or line references in your interpretations.
4. Present your interpretation in a logical sequence that is easy to follow.
5. Adhere to any explicit rules or exceptions mentioned in the 'Warnings' section.
6. Ensure that your interpretation is compliant with both the letter and the spirit of the regulations.
7. The output should only consists of clear and concise and short points like '1.', '2.' etc and not paragragh, each point should be very short but shouldnt lose the context and add '\n' after end of each point.  
 
Data Sources:
- Item value:'[Reference should be taken from the key "Title" in the user query]'
- Regulation Rules: '[Take this value from the key "Article" in the user query]'
- EBA Q&A Details: '[Take this value from the key "Reference QnA" in the user query]'
- Warnings: '[Take this value from the key "Article defination" in the user query]'
 
 
Your Interpretation*:
- Interpretation: '[Provide your interpretation here, ensuring it is clear and adheres to the instructions above]"""
                


            final_page_content = f"Title : {input_value}, Article : {article_def}, Article Definition : {page_content1}, Reference QnA : {page_content2} and give Interpretation in the similar format as provided in the system message. The Interpretation should be easy to understand by a layman and should be well structured. Remove references of any articles in the response."

            result = llm_call(final_page_content,final_sys_msg)
            articles = "\n".join(article_list)
            print(articles)

        else:
                articles = "NA" 
                result = "Interpretation not applicable"
                warning = ""


        return {"output": result, "articles":articles, "warning":warning}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))