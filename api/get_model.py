'''file that generates the model'''
from transformers import AutoModelForSequenceClassification, AutoTokenizer

def get_model(model):
    """Loads model from Hugginface model hub"""
    try:
        model = AutoModelForSequenceClassification().from_pretrained(model)
        model.save_pretrained('./model')
    except Exception as error:
        raise error

def get_tokenizer(tokenizer):
    """Loads tokenizer from Hugginface model hub"""
    try:
        tokenizer = AutoTokenizer.from_pretrained(tokenizer)
        tokenizer.save_pretrained('./model')
    except Exception as error:
        raise error


get_model('cardiffnlp/twitter-roberta-base-offensive')
get_tokenizer('cardiffnlp/twitter-roberta-base-offensive')
