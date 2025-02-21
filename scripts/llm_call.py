from langchain_openai import AzureChatOpenAI
from langchain.schema import SystemMessage
from langchain.chains import LLMChain
from langchain.prompts import ChatPromptTemplate, HumanMessagePromptTemplate, MessagesPlaceholder
from langchain.memory import ConversationBufferMemory
from langchain_community.chat_message_histories import FileChatMessageHistory

openai_api_type_local = "azure"
openai_api_base_local = "https://eygenaistudio-openai-dev.openai.azure.com/"
openai_api_version_local = "2024-05-01-preview"
openai_api_key_local = "07362a79cd45421b99f245cda89c71fb"

my_llm = AzureChatOpenAI(
    deployment_name="gpt-4",
    model_name="gpt-4",
    openai_api_key=openai_api_key_local,
    openai_api_type=openai_api_type_local,
    openai_api_version=openai_api_version_local,
    azure_endpoint=openai_api_base_local
)

sys_msg = "Extract only the Articles mentioned in the given text as a Python list, without any additional text or explanation. And if no Articles are present then give a blank list with no additional text. Append the word Articles in front if the list item doesnt have it. Also only extract the article which is relevant to 0282 and ignore the text which comes before it."
content = ""

my_prompt = ChatPromptTemplate(
    input_variables=['content'],
    messages=[SystemMessage(content=sys_msg),HumanMessagePromptTemplate.from_template('{content}')]
)

chain = LLMChain(
    llm=my_llm,
    prompt=my_prompt,
    verbose=False
)
class LLMChatClient:
    def __init__(self, llm, prompt, content, verbose=False):
        self.llm = llm
        self.prompt = prompt
        self.verbose = verbose
        self.content = content

    def get_response(self):
        response = chain.invoke({'content': self.content})
        return response["text"]


# Usage

llm = my_llm
prompt = my_prompt
client = LLMChatClient(llm, prompt, content)
response = client.get_response()
print(response)