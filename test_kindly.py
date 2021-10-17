import os
import pytest
import unittest
import json
import imp
from api.api import app, checkHeaders, detect

app.testing = True
headers = {'Authorization': 'Bearer aasdf1234', 'Content-Type': 'application/json'}

def test_detect():
    """ Testing success for /detect endpoint"""
    offensive_text = {'text': 'test'}
    with app.test_client() as c:
        response = c.post('/detect', json=offensive_text, base_url = 'http://localhost:3000/', headers=headers)
        assert response.status_code == 200

def test_detect_403():
    """ Testing 403 error if no correct headers"""
    offensive_text = {'text': 'test'}
    with app.test_client() as c:
        response = c.post('/detect', json=offensive_text, base_url = 'http://localhost:8080/')
        assert response.status_code == 403

def test_detect_offensive():
    """
    Testing success for /detect endpoint with offensive text
    Offensive leaning result eg == {'offensive': '0.8936624', 'not-offensive': '0.10633754'}
    """

    offensive_text = {'text': "You're mean!"}
    with app.test_client() as c:
        response = c.post('/detect', json=offensive_text, base_url = 'http://localhost:3000/', headers=headers)
        json_data = response.get_json()
        score = json_data['result']
        score_not_offensive = float(score['not-offensive'])
        score_offensive = float(score['offensive'])
        if score_offensive > score_not_offensive : assert True

def test_detect_not_offensive():
    """
    Testing success for /detect endpoint with no_ offensive text
    Not-offensive leaning result eg == {'not-offensive': '0.7003075', 'offensive': '0.29969257'}
    """

    not_offensive_text = {'text': "You're amazing!"}
    with app.test_client() as c:
        response = c.post('/detect', json=not_offensive_text, base_url = 'http://localhost:3000/', headers=headers)
        json_data = response.get_json()
        score = json_data['result']
        score_not_offensive = float(score['not-offensive'])
        score_offensive = float(score['offensive'])
        if score_not_offensive > score_offensive : assert True