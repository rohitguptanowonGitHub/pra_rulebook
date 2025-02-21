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
        sys_msg  = "Extract only the Articles mentioned in the given text as a Python list, without any additional text or explanation. And if no Articles are present then give a blank list with no additional text. Append the word Articles in front if the list item doesnt have it. Also only extract the article which is relevant to 0282 and ignore the text which comes before it."       
        chunks = get_chunks(file_path)
        q_embedding = embed_query_chunk(input_value)
        page_content = vector_search(q_embedding,chunks,"csai")
        articles = llm_call(page_content,sys_msg)

        #Get Article Definition
        if articles:
            article_def = articles[0]
        else:
            article_def = ""
        file_path1 = os.path.join(os.getenv('PYTHONPATH'), 'app', 'dependencies', 'rulebook_tables.csv')
        chunks1 = get_chunks(file_path1)
        q_embedding1 = embed_query_chunk(article_def)
        page_content1 = vector_search(q_embedding1,chunks1,"prarulebook")

        #Get QnA
        file_path2 = os.path.join(os.getenv('PYTHONPATH'), 'app', 'dependencies', 'qna_tables.csv')
        chunks2 = get_chunks(file_path2)
        q_embedding2 = embed_query_chunk(article_def)
        page_content2 = vector_search(q_embedding2,chunks2,"qna")
        
        #Final LLM Call
        final_sys_msg = """You are Subject Matter Expert that helps in creation of an interpretation in the bullet points on the basis of relevant information below.  
                            Title : Exposures in default subject to a risk weight of 150%, Article : UK CRR Art. 112 (j), 
                            Question : 1/ For lines 290 and 310, are the columns "215" and "220" matching the exposures’ 
                                        weighted amounts if they were not secured by a mortgage or is it necessary to declare the same weighted amounts 
                                        shown in line 010 classified according to the category of the exposure’s original counterpart. 
                                        2/ For lines 300 and 320, is the column "215" matching the exposures’ weighted amounts if they were not in
                                        default or is it necessary to declare the same weighted amounts shown in line 010 classified according to the category of the
                                        exposure’s original counterpart. 3/ Lines 300 and 320 of the CR SA’ state
                                        concern defaulted exposures for which categories before being in default
                                        were as such: - Central governments and central banks - Regional and local
                                        administrations - Public Sector Entities - Institutions that are not subjected
                                        to an evaluation of short-term credit - Businesses/Corporates that are not the
                                        subjected to an evaluation of short-term credit - Retail (customers ) Can you
                                        confirm that defaulted exposures secured by a mortgage are not affected by
                                        lines 300 and 320 of the CR SA state? However, they will be reported in the
                                        column "020" of the line 90 of the CR GB 1 state.
                            Final Answer : Rows from 290 to 320 of template C 07.00 of Regulation (EU) No 680/2014
                                        13 ITS on Supervisory Reporting of institutions (ITS) are memorandum items
                                        and affect neither the calculation of the risk weighted exposure amounts of
                                        the exposure classes according to Article 112 points a) to c) and f) to h) of
                                        the Regulation (EU) No. 575/2013 (CRR) nor of the exposure classes
                                        according to Article 112 points i) and j) of CRR reported in CR SA (please see
                                        Annex II, paragraph 55 of the ITS). In addition paragraph 56 points out, that
                                        the memorandum items provide additional information about the obligor
                                        structure of the exposure classes 'in default' and 'secured by immovable
                                        property'. Therefore the figures reported in all the columns of C 07.00 are
                                        filled considering the default status (rows 300 and 320) or immovable
                                        property collateral (rows 290 and 310). It implies that:
                                        1. Question 1 13 with regard to rows 290 and 310, columns 215 and 220
                                        include RWAs calculated according to Article 124 - 126 CRR;
                                        2. Question 2 13 with regard to rows 300 and 320, columns 215 includes
                                        RWAs calculated according to Art. 127 CRR.
                                        With reference to question 3, where an exposure secured by mortgages on a
                                        real estate (commercial or residential) is in default, it is included in rows 300
                                        or 320 of template C 07.00. With regard to the C 09.01 template, according
                                        to the instructions of row 100 of Annex II the original exposure pre
                                        conversion factor linked to a defaulted exposure is reported in cell (r100;
                                        c010) as well as in cell (r090; c020) as clarified in Q&A 2013_347.
                            Refer the below Interpretation and always create it in similar way as per the content provided above.
                            Interpretation  : This memorandum item is populated for ‘Central governments or central banks’, 
                                             ‘Regional governments or local authorities’, ‘Public sector entities’, ‘Institutions’, ‘Corporates’, and ‘Retail’ when:
                                            1)  Exposure is default. 
                                            2) RW is 150%"""
        


        final_page_content = f"Title : {input_value}, Article : {article_def}, Article Definition : {page_content1}, Reference QnA : {page_content2} and give Interpretation in the similar format as provided in the system message. The Interpretation should be easy to understand by a layman and should be well structured. Remove references of any articles in the response."

        result = llm_call(final_page_content,final_sys_msg)

        return {"output": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))