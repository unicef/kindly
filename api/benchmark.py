import os
import pytest
import timeit
import json
import texttable

from api import app

app.testing = True
headers = {'Authorization': 'Bearer aasdf1234', 'Content-Type': 'application/json',
           'Benchmark':'True'}


def get_benchmark_respose():
    """function will send request to api and return type will be 
       dictonary of function-nammes (keys) and exection time 
       of the fucntion (values)  format: {'checkheaders()': 6.068,
                                           'detect()'     : 7.758, 
                                           'preprocess()' : 5.59e-06, 
                                           'process'      : 1.71}
    """
    data = {'text': 'I love you a lot'}
    
    with app.test_client() as client:
       
        response = client.post('/detect',json=data, 
                    base_url='http://localhost:3000/',headers=headers)
       
        json_data = response.get_json()
        
        results = json_data['benchmark']
        return results


if __name__ == '__main__':

    dict=get_benchmark_respose()
    t=texttable.Texttable()
    t.add_row(['fucntion name','execution time'])

    print("Testing the excecution time through Api call: ")
    for d in dict.keys():
       t.add_row([d,"{:.2f}".format(dict[d]*1000)+'ms'])

    print(t.draw())



    #print("Api testing with with request: ")
