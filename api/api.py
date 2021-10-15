'''file that calls the api server'''
import json
import os
import urllib
import csv
from flask import Flask
from flask import request
from flask import abort
from flask import render_template
from flask_cors import CORS
import numpy as np
from dotenv import load_dotenv
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from waitress import serve
import json
import timeit

load_dotenv()

REMOTE_MAPPING = [
    'https://raw.githubusercontent.com/cardiffnlp/tweeteval/main/datasets/offensive/mapping.txt'
    ]

app = Flask(__name__)

allowed_origins = json.loads(os.environ['ALLOWED_ORIGINS']) if os.getenv('ALLOWED_ORIGINS') else []


cors = CORS(app, resources={r"/*"})

#for execution time testing
is_benchmark = False
function_exec_time={}


@app.route('/', methods=['GET', 'POST'])
def api_glossary():
    '''function for the api glossary'''
    check_headers()
    glossary = {
        "detect": "/detect",
        # "train": "/train" #this is yet to be completed
    }
    return glossary

@app.route('/test-ui', methods=['GET', 'POST'])
def welcome():
    '''function that renders the template'''
    return render_template("index.html")


@app.route('/detect', methods=['POST'])
def detect():
    global is_benchmark
    global function_exec_time

    t0=0
    if is_benchmark :
        t0=timeit.default_timer()

    checkHeaders()
    # Model loaded from https://huggingface.co/cardiffnlp/twitter-roberta-base-offensive/tree/main
    thejson = request.json
    if 'text' in thejson:
        thejson['result'] =process(thejson['text'])
    else:
        return "Invalid Parameters", 400
    

    if is_benchmark:
        function_exec_time['detect()']=timeit.default_timer()-t0
        thejson['benchmark'] = function_exec_time
    
    
        
    return thejson

@app.route("/train")
def train():
    checkHeaders()
    train_path = request.args.get("data", "data/train.csv")
    epochs = request.args.get("epochs", 10)
    emotion.train(train_path, epochs)


    
def preprocess(text):
    global is_benchmark
    global function_exec_time
    t0=0
    if is_benchmark :
        t0=timeit.default_timer()

    new_text = []
    for t in text.split(" "):
        t = '@user' if t.startswith('@') and len(t) > 1 else t
        t = 'http' if t.startswith('http') else t
        new_text.append(t)

    if is_benchmark:
        function_exec_time['preprocess()']=timeit.default_timer()-t0
    return " ".join(new_text)

def checkHeaders():

    global is_benchmark
    t0=0

    if is_benchmark :
        t0=timeit.default_timer()

    headers = flask_request.headers
    tokens = json.loads(os.getenv('TOKEN_KEYS')) #this will throw an error upon request if no token keys are present in the environment at all

    if headers.get("Authorization") is not None:     #checking for authorization
        extractBearerToken = headers['Authorization']
        token = extractBearerToken.split(" ")
        if tokens.get(token[1]) is None:
            abort(403)
    
    elif headers.get('Origin') not in allowed_origins:    #checking for origin
        abort(403)
    if headers.get("Benchmark") is not None:
        is_benchmark = True

    if is_benchmark:
        function_exec_time['checkheaders()']=timeit.default_timer()-t0


def softmax(value):
    """ applies softmax to an input x"""
    e_x = np.exp(value - np.max(value))
    return e_x / e_x.sum()


def process(input_text):
    '''Function that processes the input'''
    # Tasks:
    # emoji, emotion, hate, irony, offensive, sentiment
    # stance/abortion, stance/atheism, stance/climate, stance/feminist, stance/hillary

    # MODEL = AutoModelForSequenceClassification.
    # from_pretrained("cardiffnlp/twitter-roberta-base-offensive")
    # tokenizer = AutoTokenizer.from_pretrained("cardiffnlp/twitter-roberta-base-offensive")
    # download label mapping
    global is_benchmark
    global function_exec_time
    t0=0
    
    if is_benchmark :
        t0=timeit.default_timer()
        
    labels = []
    if os.path.isfile("model/mapping.txt"):
        file_path = open("model/mapping.txt",encoding="utf8")
        html = file_path.read().split("\n")
    else:
        file_path = urllib.request.urlopen(REMOTE_MAPPING)
        html = file_path.read().decode('utf-8').split("\n")
    with file_path:
        csvreader = csv.reader(html, delimiter='\t')
        labels = [row[1] for row in csvreader if len(row) > 1]
    file_path.close()

    # pylint: disable=no-value-for-parameter
    model = AutoModelForSequenceClassification.from_pretrained('./model')
    # model.save_pretrained(MODEL)
    tokenizer = AutoTokenizer.from_pretrained('./model')
    encoded_input = tokenizer(preprocess(input_text), return_tensors='pt')
    output = model(**encoded_input)

    scores = output[0][0].detach().numpy()
    scores = softmax(scores)

    # # TF (Code below is if this process was to be done with TensoFlow)
    # model = TFAutoModelForSequenceClassification.from_pretrained(MODEL)
    # model.save_pretrained(MODEL)
    # text = "Good night 😊"
    # encoded_input = tokenizer(text, return_tensors='tf')
    # output = model(encoded_input)
    # scores = output[0][0].numpy()
    # scores = softmax(scores)

    ranking = np.argsort(scores)
    ranking = ranking[::-1]
    results = {}
    for i in range(scores.shape[0]):
        #l = labels[ranking[i]]
        score = scores[ranking[i]]
        results[labels[ranking[i]]] = str(score)

    if is_benchmark:
        function_exec_time['process']=timeit.default_timer()-t0

    return results


if __name__ == '__main__':
    # app.run(host='0.0.0.0', port=8080)
    serve(app, host='0.0.0.0', port=8080)
