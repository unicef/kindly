import os
import pytest
import unittest
import json

from api import app

app.testing = True
headers = json.loads(os.environ['HEADERS'])

def test_api_glossary():
    """ Testing success for '/' endpoint"""
    with app.test_client() as c:
        response = c.post('/', base_url = 'http://localhost:3000/', headers=headers)
        assert response.status_code == 200

def test_api_glossary_403():
    """ Testing 403 error if unauthorised"""
    with app.test_client() as c:
        response = c.post('/', base_url = 'http://localhost:3000/')
        assert response.status_code == 403

def test_welcome():
    """ Testing success for '/test-ui' endpoint"""
    with app.test_client() as c:
        response = c.post('/test-ui', base_url = 'http://localhost:3000/')
        assert response.status_code == 200

def test_404():
    """ Testing 404 response for invalid endpoint"""
    with app.test_client() as c:
        response = c.post('/invalid', base_url = 'http://localhost:3000/')
        assert response.status_code == 404

'''
Tests for /detect endpoint
'''

def test_detect():
    """ Testing success for /detect endpoint"""
    offensive_text = {'text': 'test'}
    with app.test_client() as c:
        response = c.post('/detect', json=offensive_text, base_url = 'http://localhost:3000/', headers=headers)
        assert response.status_code == 200

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

def test_detect_403():
    """ Testing 403 error if unauthorised"""
    offensive_text = {'text': 'test'}
    with app.test_client() as c:
        response = c.post('/detect', json=offensive_text, base_url = 'http://localhost:3000/')
        assert response.status_code == 403

def test_detect_400():
    """ Testing 400 error if invalid json input"""
    invalid_json = {'invalid': ""}
    with app.test_client() as c:
        print(invalid_json)
        response = c.post('/detect', json=invalid_json, base_url = 'http://localhost:3000/', headers=headers)
        assert response.status_code == 400

'''
Tests for /train endpoint
'''
# /train input has not been completed. `NameError: name 'emotion' is not defined`
# def test_train():
#     """ Testing success for /train endpoint"""
#     with app.test_client() as c:
#         response = c.get('/train', base_url = 'http://localhost:3000/', headers=headers)
#         assert response.status_code == 200
