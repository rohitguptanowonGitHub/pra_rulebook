import sys
from dotenv import load_dotenv
import os
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
# Load environment variables from .env file
load_dotenv()
# Add the root directory of your project to the PYTHONPATH
#sys.path.append(os.getenv('PYTHONPATH'))



from fastapi import FastAPI
from .api.endpoints import router as api_router


 
app = FastAPI()
app.add_middleware(     CORSMiddleware,     allow_origins=["*"],     allow_credentials=True,     allow_methods=["GET", "POST", "PUT", "DELETE"],     allow_headers=["*"], )

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI service"}

app.include_router(api_router)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))  # Render provides PORT dynamically
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)