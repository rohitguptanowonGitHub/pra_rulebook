//npm create vite@latest app -- --template react
//npm install
//npm install @chatscope/chat-ui-kit-react
//npm run dev

import { useState } from "react";
import { format } from "date-fns";
import "./ChatBot.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  ConversationHeader,
  Avatar,
  ArrowButton,
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react";

export function ChatBot(props) {
  //New Code

  let currentDate = format(new Date(), "eeee, MMMM dd yyyy");
  let hide = {
    display: "none",
  };
  let show = {
    display: "block",
  };
  //const [chatopen, setChatopen] = useState(false);

  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message:
        "Hello, I am PRAgma. Welcome to EY's regulatory repository services, your one stop shop for all the pra rulebook related queries. Ask me a question.",
      sender: "AIChatBOT",
      direction: "incoming",
    },
  ]); //[]

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
      sentTime: "just now",
    };

    const newMessages = [...messages, newMessage]; //all the new messages + the new message

    // update message state
    setMessages(newMessages);

    // set a typing indicator (chatgpt is typing)
    setTyping(true);

    // process message to ChatGPT (send it over and see the response])
    await processMessageToChatGPT(newMessage, newMessages);
  };
  function selectAvatar(chatMessage) {
    if (chatMessage.sender == "user")
      return "https://chatscope.io/storybook/react/assets/joe-v8Vy3KOS.svg";
    else
      return "https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg";
  }
  async function processMessageToChatGPT(chatMessage, chatMessages) {
    const apiRequestBody = {
      user_prompt: chatMessage.message,
    };

    await fetch("http://127.0.0.1:8000/aichat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        console.log(data);
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setMessages([
          ...chatMessages,
          {
            message: data.output,
            sender: "ai_bot",
            direction: "incoming",
            sentTime: "just now",
          },
        ]);
        setTyping(false);
      });
  }

  //npm install @chatscope/chat-ui-kit-reactope/chat-ui-kit-react

  return (
    <div className="ChatBot">
      {
        //<div class="chat-box" style={chatopen ? show : hide}>
      }
      <div class="chat-box" style={props.chatopen ? show : hide}>
        <div style={{ height: "40em", width: "30em" }}></div>
        <MainContainer>
          <ChatContainer
            style={{
              height: "55em",
              marginLeft: "0.25em",
              width: "90em",
            }}
          >
            <ConversationHeader>
              <Avatar
                name="Pragma"
                src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
                status="available"
              />
              <ConversationHeader.Content info="Active now" userName="PRAgma" />
              <ConversationHeader.Actions>
                <ArrowButton direction="down" onClick={props.toggle} />
              </ConversationHeader.Actions>
            </ConversationHeader>

            <MessageList
              scrollBehavior="auto"
              typingIndicator={
                typing ? <TypingIndicator content="Pragma is typing" /> : null
              }
            >
              <MessageSeparator content={currentDate} />
              {messages.map((message, i) => {
                console.log(message);
                return (
                  <Message key={i} model={message}>
                    <Avatar src={selectAvatar(message)} name="User" size="md" />
                  </Message>
                );
              })}
            </MessageList>
            <MessageInput
              placeholder="Type message here ..."
              onSend={handleSend}
              attachButton="false"
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default ChatBot;
