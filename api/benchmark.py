"""
Provides excecution time of the major functions of api.py
"""
import texttable

from api import app

app.testing = True
headers = {'Authorization': 'Bearer aasdf1234', 'Content-Type': 'application/json',\
           'Benchmark':'True'}


def get_benchmark_respose():
    """function will send request to api and return type will\
       be dictionary of function-nammes (keys) and exection\
       time of the fucntion (values)  format: {'checkheaders()': 6.068,\
                                              'detect()': 7.758,\
                                              'preprocess()' : 5.59e-06,\
                                              'process': 1.71}
    """
    data = {'text': 'I love you a lot'}

    with app.test_client() as client:
        response = client.post('/detect',json=data,\
                    base_url='http://localhost:3000/',headers=headers)
        json_data = response.get_json()
        results = json_data['benchmark']
        return results


if __name__ == '__main__':

    time_diconary=get_benchmark_respose()
    text_renderer=texttable.Texttable()
    text_renderer.add_row(['fucntion name','execution time'])
    print("Testing the excecution time through Api call: ")
    for key in time_diconary.keys():
        text_renderer.add_row([key,"{:.2f}".format(time_diconary[key]*1000)+'ms'])

    print(text_renderer.draw())
    #print("Api testing with with request: ")
