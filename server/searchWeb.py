import requests
import os
from dotenv import load_dotenv
from langchain.document_loaders import UnstructuredURLLoader
from langchain.llms import OpenAI
from langchain.chains import RetrievalQA
from langchain.indexes import VectorstoreIndexCreator
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
import json
import sys

url = 'https://www.googleapis.com/customsearch/v1'

def results(preferredNews, favoriteGenres, favoriteActors, preferredLanguage):
    preferences = {'New Releases': [], 'Reviews': [], 'Actor News': [], 
    'Top Hits': [], 'Award Winners': []}
    for news in preferredNews:
        for preference in favoriteGenres:
            preferences[news].append(preference)
        for preference in favoriteActors:
            preferences[news].append(preference)
        for preference in preferredLanguage:
            preferences[news].append(preference)
    searches = []
    for addSearch in preferences['New Releases']:
        searches.append(addSearch + ' new movie releases latest news articles 2024 -inurl:index -inurl:home')
    for addSearch in preferences['Reviews']:
        searches.append(addSearch + ' movie reviews latest news articles 2024 -inurl:index -inurl:home')
    for addSearch in preferences['Actor News']:
        searches.append(addSearch + ' actor latest news articles 2024 -inurl:index -inurl:home')
    for addSearch in preferences['Top Hits']:
        searches.append(addSearch + ' top movie latest news articles 2024 -inurl:index -inurl:home')
    for addSearch in preferences['Award Winners']:
        searches.append(addSearch + ' movie award winners latest news articles 2024 -inurl:index -inurl:home')
    
    load_dotenv()
    GOOGLE_API_KEY = os.getenv('REACT_APP_GOOGLE_API_KEY')
    GOOGLE_SEARCH_ENGINE = os.getenv('REACT_APP_GOOGLE_SEARCH_ENGINE')

    results = []
    count = 0
    for search in searches:
        if(len(results) == 5):
            break
        params = {
            'q': search,
            'key': GOOGLE_API_KEY,
            'cx': GOOGLE_SEARCH_ENGINE,
            'lr': 'lang_en',
            'dateRestrict': 'm1',
        }
        response = requests.get(url, params=params)
        newsResults = response.json()['items']
        results.append(newsResults[1]['link'])
        count += 1

    return results

def generateNews(url):
    try:
        openai_api_key = os.getenv('REACT_APP_OPENAI_API_KEY')
        urls = [url]
        loader = UnstructuredURLLoader(urls=urls)
        docs = loader.load()
        text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
        texts = text_splitter.split_documents(docs)
        embeddings = OpenAIEmbeddings(openai_api_key=openai_api_key)
        db = Chroma.from_documents(texts, embeddings)
        retriever = db.as_retriever(search_type="similarity", search_kwargs={"k":2})
        qa = RetrievalQA.from_chain_type(
            llm=OpenAI(openai_api_key=openai_api_key), chain_type="stuff", retriever=retriever, return_source_documents=False)
        query = "You are a news reporter. Create a news report on this article that is between 100 and 200 words. The first sentence should be a headline for the news story. Every sentence should be complete."
        result = qa({"query": query})["result"]
        return result
    except Exception as e:
        return ""

if __name__ == "__main__":
    currentNews = []
    arg1 = json.loads(sys.argv[1])
    arg2 = json.loads(sys.argv[2])
    arg3 = json.loads(sys.argv[3])
    arg4 = json.loads(sys.argv[4])
    urls = results(arg1, arg2, arg3, arg4)
    for i in range(5):
        if(i == len(urls)):
            break
        elif(len(generateNews(urls[i])) > 0):
            currentNews.append(generateNews(urls[i]))
    
    parsedNews = []
    for i in range(len(currentNews)):
        first_quote_position = currentNews[i].find('"')    
        second_quote_position = currentNews[i].find('"', first_quote_position + 1)
        header = currentNews[i][:second_quote_position + 1]
        body = currentNews[i][second_quote_position + 1:]
        parsedNews.append([header, body])
    print(json.dumps(parsedNews))