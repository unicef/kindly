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

#for execution time calculation of major functions
if __debug__:
    import timeit
    FUNCTION_EXEC_TIME={}


load_dotenv()

REMOTE_MAPPING = 'https://raw.githubusercontent.com/cardiffnlp'\
                 '/tweeteval/main/datasets/offensive/mapping.txt'

app = Flask(__name__)

allowed_origins = json.loads(os.environ['ALLOWED_ORIGINS']) if os.getenv('ALLOWED_ORIGINS') else []

cors = CORS(app, resources={r"/*"})


@app.route('/', methods=['GET'])
def api_glossary():
    '''function for the api glossary'''
    # check_headers()
    glossary = {
        "detect": "/detect",
        "train": "/train"
    }
    return glossary

@app.route('/test-ui', methods=['GET', 'POST'])
def welcome():
    '''function that renders the template'''
    return render_template("index.html")


@app.route('/detect', methods=['POST'])
def detect():
    '''Function that detects the text in json file'''
    if __debug__:
        # global FUNCTION_EXEC_TIME  # pylint: disable=global-statement
        t_0=timeit.default_timer()

    check_headers()
    # Model loaded from https://huggingface.co/cardiffnlp/twitter-roberta-base-offensive/tree/main
    thejson = request.json
    if 'text' in thejson:
        thejson['result'] = process(thejson['text'])
    else:
        return "Invalid Parameters", 400

    if __debug__:
        FUNCTION_EXEC_TIME['detect()']=timeit.default_timer()-t_0
        thejson['benchmark'] = FUNCTION_EXEC_TIME

    return thejson

# @app.route("/train")
# def train():
#     '''Function that gets the train data and epochs'''
#     check_headers()
#     train_path = request.args.get("data", "data/train.csv")
#     epochs = request.args.get("epochs", 10)
#     emotion.train(train_path, epochs)

def preprocess(texts):
    '''Function that processes the texts'''
    if __debug__:
        # global FUNCTION_EXEC_TIME  # pylint: disable=global-statement
        t_0=timeit.default_timer()

    new_text = []
    for text in texts.split(" "):
        text = '@user' if text.startswith('@') and len(text) > 1 else text
        text = 'http' if text.startswith('http') else text
        new_text.append(text)

    if __debug__:
        FUNCTION_EXEC_TIME['preprocess()']=timeit.default_timer()-t_0

    return " ".join(new_text)

def check_headers():
    '''Function that confirms the headers and token keys'''
    if __debug__:
        t_0=timeit.default_timer()

    headers = request.headers
    #this will throw an error upon request if no token keys are present in the environment at all
    tokens = json.loads(os.getenv('TOKEN_KEYS')) if os.getenv('TOKEN_KEYS') else {}
    #checking for authorization
    if headers.get("Authorization") is not None:
        extract_bearer_token = headers['Authorization']
        token = extract_bearer_token.split(" ")
        if tokens.get(token[1]) is None:
            abort(403)
    elif headers.get('Origin') not in allowed_origins:    #checking for origin
        abort(403)

    if __debug__:
        FUNCTION_EXEC_TIME['checkheaders()']=timeit.default_timer()-t_0


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
    if __debug__:
        # global FUNCTION_EXEC_TIME  # pylint: disable=global-statement
        t_0=timeit.default_timer()

    labels = []
    if os.path.isfile("model/mapping.txt"):
        # pylint: disable=consider-using-with # because it is reused below
        file_path = open("model/mapping.txt", encoding="utf8")
        html = file_path.read().split("\n")
    else:
        file_path = urllib.request.urlopen(REMOTE_MAPPING)
        html = file_path.read().decode('utf-8').split("\n")
    with file_path:
        csvreader = csv.reader(html, delimiter='\t')
        labels = [row[1] for row in csvreader if len(row) > 1]
    file_path.close()

    # pylint: disable=no-value-for-parameter # the class def seems inconsistent
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

    if __debug__:
        FUNCTION_EXEC_TIME['process']=timeit.default_timer()-t_0

    return results


if __name__ == '__main__':
    # app.run(host='0.0.0.0', port=8080)
    serve(app, host='0.0.0.0', port=8080)
