class LLMChatClient:
    def __init__(self, chain, content,verbose=False):
        self.chain = chain
        self.verbose = verbose
        self.content = content

    def get_response(self):
        response = self.chain.invoke({'content': self.content})
        return response["text"]