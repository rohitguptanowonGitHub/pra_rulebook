from pinecone_text.sparse import BM25Encoder
from langchain_community.document_loaders.csv_loader import CSVLoader
from pinecone import Pinecone, ServerlessSpec
from langchain_text_splitters import CharacterTextSplitter
from openai import AzureOpenAI
import pandas as pd
import pinecone
import warnings
import os
import nltk
from rank_bm25 import BM25Okapi
import pandas as pd


warnings.filterwarnings("ignore")
print("\033[31m!!!!!!ALL WARNINGS ARE DISABLED!!!!!!!!\033[0m")

# API Keys
openai_api_base_local = "https://eygenaistudio-openai-dev.openai.azure.com/"
openai_api_version_local = "2024-05-01-preview"
openai_api_key_local = "07362a79cd45421b99f245cda89c71fb"
pinecone_api_key = "pcsk_4NZkAC_NmmgNw869dExgqdZPesRhhLGDbQshb5Sg71K5vH5LHxAGcnTL7CxcPpHKAZwbU6"

# Initialize Pinecone & Azure OpenAI
pc = Pinecone(api_key=pinecone_api_key, ssl_verify=False)
client = AzureOpenAI(api_key=openai_api_key_local, api_version=openai_api_version_local, azure_endpoint=openai_api_base_local)

# Load sentence embedding model
#embedding_model = SentenceTransformer("all-MiniLM-L6-v2")


import pandas as pd

# Load CSV file
file_path = "rulebook_tables.csv"
df = pd.read_csv(file_path)

# # Convert each row into a separate chunk
chunks = df.apply(lambda row: "|".join(map(str, row)), axis=1).tolist()

# Print chunks
# for i, chunk in enumerate(chunks):
#     print(f"\n🔹 Chunk {i+1}:\n{chunk}")

#Dense Embedding (Azure OpenAI)
def embed(chunks):
    print("Embedding chunks using OpenAI model...")
    embedlist = []  # List to store embeddings
    
    for i in chunks:
        response = client.embeddings.create(
            input=i, model="text-embedding-ada-002"
        )
        embedding = response.data[0].embedding
        
        # Ensure embeddings are 1536-dimensional
        if len(embedding) != 1536:
            raise ValueError(f"Unexpected embedding dimension: {len(embedding)}. Expected 1536.")

        embedlist.append(embedding)
    
    return embedlist

# Create Pinecone Index
def create_pinecone_index(index_name):
    pc = Pinecone(api_key=pinecone_api_key, ssl_verify=False)

    # Check if index exists
    if index_name in pc.list_indexes().names():
        print(f"Index '{index_name}' already exists.")

        # Get index metadata
        index_description = pc.describe_index(index_name)
        existing_dimension = index_description.dimension

        if existing_dimension != 1536:
            print(f"⚠️ Mismatched dimension! Existing index: {existing_dimension}, Expected: 1536")
            print("Deleting and recreating index with correct dimension...")
            delete_pinecone_index(index_name)

        else:
            print(f"✅ Index dimension matches (1536). No need to recreate.")
            return

    # Create new index with 1536 dimensions
    print(f"Creating index '{index_name}' with dimension 1536...")
    pc.create_index(
        name=index_name,
        dimension=1536,
        metric="cosine",  # Recommended for OpenAI embeddings
        spec=ServerlessSpec(cloud="aws", region="us-east-1"),
    )
    print(f"✅ Index '{index_name}' created successfully.")




# Delete Pinecone Index
def delete_pinecone_index(index_name="all"):
    if index_name == "all":
        indexes = pc.list_indexes().names()
        for index in indexes:
            pc.delete_index(index)
    else:
        pc.delete_index(index_name)


# Upsert Vectors into Pinecone
def upsert(embedlist):
    print("Upserting...")

    pc = Pinecone(api_key=pinecone_api_key, ssl_verify=False)
    index_name = "prarulebook"

    # Check if index exists
    if index_name not in pc.list_indexes().names():
        raise ValueError(f"Index '{index_name}' does not exist. Please create it first.")

    index = pc.Index(index_name)  # Now safe to initialize

    local_vectors = []
    vector_id = 1
    for i in embedlist:
        vector_id_text = str(vector_id)
        float_values = [float(x) for x in i]
        local_vectors.append({"id": vector_id_text, "values": float_values})
        vector_id += 1

    batch_size = 300
    for i in range(0, len(local_vectors), batch_size):
        batch = local_vectors[i:i + batch_size]
        index.upsert(vectors=batch)

    print("\n✅ Upsert complete")


# embedlist = embed(chunks)
# delete_pinecone_index("prarulebook")
# #Ensure index exists before upserting
# index_name = "prarulebook"
# create_pinecone_index(index_name)  
# upsert(embedlist)





def embed_query_chunk(query):
    response = client.embeddings.create(input=query, model="text-embedding-ada-002")
    embedding = response.data[0].embedding
    # Ensure embeddings are 1536-dimensional
    if len(embedding) != 1536:
        raise ValueError(f"Unexpected embedding dimension: {len(embedding)}. Expected 1536.")
    return embedding

def vector_search(q_embedding):
    index = pc.Index("csai")
    query_result = index.query(vector=q_embedding, top_k=1, include_metadata=True)
    first_id = query_result['matches'][0]['id']
    print(first_id)
    id = int(first_id)
    page_content = chunks[id - 1]  # Subtract 1 since chunks are 0-indexed but IDs start at 1
    print(page_content)

qe = embed_query_chunk("Article117(2)")
vector_search(qe)
