import sys
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Add the root directory of your project to the PYTHONPATH
sys.path.append(os.getenv('PYTHONPATH'))


from app.core.functions import get_chunks, embed_query_chunk, vector_search, llm_call

file_path = os.path.join(os.getenv('PYTHONPATH'), 'app', 'dependencies', 'extracted_tables.csv')
sys_msg  = "Extract only the Articles mentioned in the given text as a Python list, without any additional text or explanation. And if no Articles are present then give a blank list with no additional text. Append the word Articles in front if the list item doesnt have it. Also only extract the article which is relevant to 0282 and ignore the text which comes before it."

chunks = get_chunks(file_path)

q_embedding = embed_query_chunk("Exposures in default subject to a risk weight of 150%")

page_content = vector_search(q_embedding,chunks,"csai")

articles = llm_call(page_content,sys_msg)

print(articles)


