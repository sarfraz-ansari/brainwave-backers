from flask import Flask, render_template, request, abort
from flask_cors import CORS
from google.cloud import storage
from llama_index import SimpleDirectoryReader, GPTListIndex, GPTVectorStoreIndex, LLMPredictor, PromptHelper, ServiceContext, StorageContext, load_index_from_storage
from langchain import OpenAI as opena
from dotenv import load_dotenv
import sys
import os
import openai
import glob

os.environ["OPEN_API_KEY"] = os.getenv("api_key")
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./adc.json"

project_name = os.getenv("project_name")
bucket_name = os.getenv("bucket_name")

app = Flask(__name__, template_folder='templates')
CORS(app)


@app.route('/', defaults={'page': 'index'})
@app.route('/<page>')
def show(page):
    try:
        return render_template(f'{page}.html')
    except TemplateNotFound:
        abort(404)


def createIndex(botname):
    try:
        print("Documents download started")
        storage_client = storage.Client(project=project_name)
        prefix = botname + "-Documents"
        destination_folder = botname + "-Index"
        if not os.path.exists(prefix):
            os.makedirs(prefix)

        bucket = storage_client.get_bucket(bucket_name)
        blobs = list(bucket.list_blobs(prefix=prefix + "/"))

        for blob in blobs:
            blob.download_to_filename(blob.name)  # download
        print("Downloading documents")

        print("Index creation created")
        # llama-Index usecase
        print("Index Creation Started")
        max_input = 4096
        tokens = 256
        chunk_size = 600
        max_chunk_overlap = 20

        prompt_helper = PromptHelper(
            max_input, tokens, max_chunk_overlap, chunk_size_limit=chunk_size)

        # def lang model
        llm = opena(temperature=0, model_name="text-ada-001", max_tokens=tokens)
        llmPredictor = LLMPredictor(llm)
        docs = SimpleDirectoryReader("./" + prefix).load_data()
        service_context = ServiceContext.from_defaults(
            llm_predictor=llmPredictor, prompt_helper=prompt_helper)
        vectorIndex = GPTVectorStoreIndex.from_documents(
            documents=docs, service_context=service_context)

        vectorIndex.storage_context.persist(persist_dir=destination_folder)
        print("Index creation completed")
        # Persist the Index files into the GCS bucket
        print("File upload started")
        bucket = storage_client.bucket(bucket_name)
        assert os.path.isdir(destination_folder)
        for file in glob.glob("./" + destination_folder + "/**"):
            filename = file.split('/')[-1]
            filename = filename.split('\\')[-1]
            blob = bucket.blob(destination_folder + "/" + filename)
            blob.upload_from_filename(file)
        print("File upload completed")
    except Exception as e:
        print(e)
        print("Error occurred in Creating Index")
    else:
        print("Response from createIndex Function")
        return "Response from createIndex Function"


@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        botname = request.form['botname']
        filetype = request.form['filetype']
        files = request.files.getlist("files")

        for file in files:
            print(file.filename)

        # Push the files into the GCS Bucket with directory name as botname
        destination_folder = botname + "-Documents"
        storage_client = storage.Client(project=project_name)
        bucket = storage_client.bucket(bucket_name)

        for file in files:
            file_blob = bucket.blob(destination_folder + "/" + file.filename)
            file_blob.upload_from_file(file)

        # Creation of Index

    except Exception as e:
        print(e)
        print("Error occurred in file upload")
        return "File upload failed"
    else:
        print("Successful file upload")
        return 'Response from upload function'


@app.route('/chatbot', methods=['POST'])
def useBot():
    try:
        botname = request.form['botname']
        prompt = request.form['prompt']

        print("Download started")
        prefix = botname + "-Index"
        if not os.path.exists(prefix):
            os.makedirs(prefix)
        storage_client = storage.Client(project=project_name)
        bucket = storage_client.get_bucket(bucket_name)
        blobs = list(bucket.list_blobs(prefix=prefix + "/"))

        for blob in blobs:
            blob.download_to_filename(blob.name)  # Download

        print("Downloaded Indexes successfully")

        print("Query started")
        storage_context = StorageContext.from_defaults(persist_dir=prefix)
        vIndex = load_index_from_storage(storage_context=storage_context)
        vIndex = vIndex.as_query_engine()
        response = vIndex.query(prompt)
        print("Query started")

        print(response)
        print(type(response))
        return str(response)

    except Exception as e:
        print(e)
        return "Error occurred in chatbot"


if __name__ == '__main__':
    # app.run()
    createIndex("B2")
    # response = useBot()
    # print(response)
