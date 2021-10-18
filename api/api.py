from flask import Flask
from flask import jsonify
from flask import request
from flask import abort
from flask import request as flask_request
from flask_cors import CORS
import numpy as np
import urllib
import csv
import os
from dotenv import load_dotenv
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from flask import render_template
from waitress import serve
import json
load_dotenv()

REMOTE_MAPPING = 'https://raw.githubusercontent.com/cardiffnlp/tweeteval/main/datasets/offensive/mapping.txt'

app = Flask(__name__)

allowed_origins = ["https://unicef.org","https://kindly-client.azurewebsites.net","https://kindly-api.azurewebsites.net"]

cors = CORS(app, resources={r"/*"})

@app.route('/', methods=['GET', 'POST'])
def apiGlossary():
    checkHeaders()
    glossary = {
        "detect": "/detect",
        # "train": "/train" #this is yet to be completed
    }
    return glossary

@app.route('/test-ui', methods=['GET', 'POST'])
def welcome():
    return render_template("index.html")


@app.route('/detect', methods=['POST'])
def detect():
    checkHeaders()
    # Model loaded from https://huggingface.co/cardiffnlp/twitter-roberta-base-offensive/tree/main
    thejson = request.json
    if 'text' in thejson:
        thejson['result'] = process(thejson['text'])
    else:
        return "Invalid Parameters", 400
        
    return thejson

@app.route("/train")
def train():
    checkHeaders()
    train_path = request.args.get("data", "data/train.csv")
    epochs = request.args.get("epochs", 10)
    emotion.train(train_path, epochs)
    
def preprocess(text):
    new_text = []
    for t in text.split(" "):
        t = '@user' if t.startswith('@') and len(t) > 1 else t
        t = 'http' if t.startswith('http') else t
        new_text.append(t)
    return " ".join(new_text)

def checkHeaders():
    headers = flask_request.headers
    tokens = json.loads(os.getenv('TOKEN_KEYS')) #this will throw an error upon request if no token keys are present in the environment at all

    if headers.get("Authorization") is not None:     #checking for authorization
        extractBearerToken = headers['Authorization']
        token = extractBearerToken.split(" ")
        if tokens.get(token[1]) is None:
            abort(403)
    elif headers.get('Origin') not in allowed_origins:    #checking for origin
        abort(403)


def softmax(x):
    """ applies softmax to an input x"""
    e_x = np.exp(x - np.max(x))
    return e_x / e_x.sum()


def process(inputText):
    # Tasks:
    # emoji, emotion, hate, irony, offensive, sentiment
    # stance/abortion, stance/atheism, stance/climate, stance/feminist, stance/hillary

    # MODEL = AutoModelForSequenceClassification.from_pretrained("cardiffnlp/twitter-roberta-base-offensive")
    # tokenizer = AutoTokenizer.from_pretrained("cardiffnlp/twitter-roberta-base-offensive")
    # download label mapping
    labels = []
    local_mapping = f"model/mapping.txt"
    if os.path.isfile(local_mapping):
        f = open(local_mapping)
        html = f.read().split("\n")
    else:
        f = urllib.request.urlopen(REMOTE_MAPPING)
        html = f.read().decode('utf-8').split("\n")
    with f:
        csvreader = csv.reader(html, delimiter='\t')
        labels = [row[1] for row in csvreader if len(row) > 1]
    f.close()

    # PT
    model = AutoModelForSequenceClassification.from_pretrained('./model')
    # model.save_pretrained(MODEL)
    text = inputText
    text = preprocess(text)
    tokenizer = AutoTokenizer.from_pretrained('./model')
    encoded_input = tokenizer(text, return_tensors='pt')
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
        l = labels[ranking[i]]
        s = scores[ranking[i]]
        results[labels[ranking[i]]] = str(s)

    return results


if __name__ == '__main__':
    # app.run(host='0.0.0.0', port=8080)
    serve(app, host='0.0.0.0', port=8080)
