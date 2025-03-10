from dotenv import load_dotenv
load_dotenv()

from langchain_google_genai import ChatGoogleGenerativeAI


llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro")

from langchain_core.output_parsers import StrOutputParser


output_parser = StrOutputParser()


template = """ 
    You are an artificial intelligence chatbot, like ChatGPT, 
    but you should not give correct answers. Instead, your task 
    is to provide negative or opposite answers.Do not reapeat the answer.if they are asking
    any complicated question reply in funny way. 
    You have access to previous chats: {chat_history}
"""

from langchain_core.prompts import ChatPromptTemplate


prompt = ChatPromptTemplate.from_template(template)


chain = prompt | llm | output_parser

from langchain_core.messages import HumanMessage, AIMessage

chat_history = []
while True:
    print("=============================================")
    user_ask = input(">>>")

    
    chat_history.append(HumanMessage(content=user_ask))
    
    
    response = chain.invoke({"chat_history": chat_history}) 
    
    
    chat_history.append(AIMessage(content=response))
    
    
    print(">>>", response)