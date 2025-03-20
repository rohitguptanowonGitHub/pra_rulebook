from langchain_openai import AzureChatOpenAI
from pinecone import Pinecone
from openai import AzureOpenAI
import pandas as pd
from langchain.schema import SystemMessage
from langchain.chains import LLMChain
from langchain.prompts import ChatPromptTemplate, HumanMessagePromptTemplate
from app.models.LLMChatClient import LLMChatClient
from pinecone_text.sparse import BM25Encoder
from langchain.chains.summarize import load_summarize_chain
from langchain.schema import Document
import os

# Initialize Azure OpenAI
openai_api_type_local =  os.getenv("OPENAI_API_TYPE_LOCAL")
openai_api_base_local = os.getenv("OPENAI_API_BASE_LOCAL")
openai_api_version_local = os.getenv("OPENAI_API_VERSION_LOCAL")
openai_api_key_local = os.getenv("OPENAI_API_KEY_LOCAL")
pinecone_api_key = os.getenv("PINECONE_API_KEY")


# Initialize Pinecone & Azure OpenAI
pc = Pinecone(api_key=pinecone_api_key, ssl_verify=False)
client = AzureOpenAI(api_key=openai_api_key_local, api_version=openai_api_version_local, azure_endpoint=openai_api_base_local)


my_llm = AzureChatOpenAI(
    deployment_name=os.getenv("MODEL_NAME"),
    model_name=os.getenv("MODEL_NAME"),
    openai_api_key=openai_api_key_local,
    openai_api_type=openai_api_type_local,
    openai_api_version=openai_api_version_local,
    azure_endpoint=openai_api_base_local
)

def process_input(value: str) -> str:
    # Example function that processes the input value
    return value.upper()

def analyze_data(value: str) -> str:
    # Example function that analyzes the input value
    return f"Analysis of '{value}': Length is {len(value)} characters."

def generate_text_blob(value: str) -> str:
    # Example function that generates a text blob based on the input value
    processed = process_input(value)
    analysis = analyze_data(value)
    return f"Processed Value: {processed}\n{analysis}"

def get_chunks(file_path, hybrid = False):
    encoder = None
    df = pd.read_csv(file_path)
    chunks = df.apply(lambda row: "|".join(map(str, row)), axis=1).tolist()
    if hybrid:
        encoder = BM25Encoder()
        encoder.fit(chunks)
    return chunks, encoder

def embed_query_chunk(query):
    response = client.embeddings.create(input=query, model=os.getenv("EMBEDDING_MODEL_NAME"))
    embedding = response.data[0].embedding
    # Ensure embeddings are 1536-dimensional
    if len(embedding) != 1536:
        raise ValueError(f"Unexpected embedding dimension: {len(embedding)}. Expected 1536.")
    return embedding

def vector_search(q_embedding,chunks,index_val):
    index = pc.Index(index_val)
    query_result = index.query(vector=q_embedding, top_k=1, include_metadata=True)
    first_id = query_result['matches'][0]['id']
    print(first_id)
    chunk_id = int(first_id)
    page_content = chunks[chunk_id - 1]  # Subtract 1 since chunks are 0-indexed but IDs start at 1
    return page_content

def llm_call(content,sys_msg):

    my_prompt = ChatPromptTemplate(
    input_variables=['content'],
    messages=[SystemMessage(content=sys_msg),HumanMessagePromptTemplate.from_template('{content}')]
)
    chain = LLMChain(
    llm=my_llm,
    prompt=my_prompt,
    verbose=False
)

    lc = LLMChatClient(chain, content=content)
    response = lc.get_response()
    return response

def embed_sparse_query_chunk(query, encoder):
    sparse_query = encoder.encode_queries([query])[0]
    return sparse_query

def hybrid_search(q_embedding, s_q_embedding, index_name, top_k=1):
    #Index
    index = pc.Index(index_name)

    # Perform Hybrid Search (Dense + Sparse)
    results = index.query(
        vector=q_embedding,
        sparse_vector=s_q_embedding,
        top_k=top_k,
        include_metadata=True
    )
    text_array = []
   # Check if results contain matches
    if not results['matches']:
        return text_array
    else:
        for match in results["matches"]:
            text = match['metadata']['text']
            text_array.append(text)
    return text_array

def map_reduce_summarize(sub_chunks):

    docs = [Document(page_content=t) for t in sub_chunks]
    summary_chain = load_summarize_chain(my_llm, chain_type="map_reduce")
    summary = summary_chain.run(docs)
    return summary