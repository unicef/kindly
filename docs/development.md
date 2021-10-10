# Development

Please make sure that your development environment has the following prerequisites:
- NodeJS 16
- Python 3
    - Using a command-line terminal of your choice, `cd` into the api folder.
    - Run the following commands to complete your environment
    - `pip install --upgrade pip`
    - `pip install -r requirements.txt`

    ⚠️ *This configuration is known to work with Python 3.8.0. Other versions of Python may have different dependencies, which will require different versions of `requirements.txt`, for example, if you have Python 3.6, try the following instead: `pip install -r requirements.python-3.6.8.txt`. We will add more configuration files as we try other versions.*

    - Install pytorch by going to (their website)[https://pytorch.org/get-started/locally/] to know how to do it with your operating system. However, for this mac configuration in this project you can use `pip` by running `pip install torch torchvision` 

### Environment Variables

You can set Authorization headers using environment variables
The current sample template can be found in the `.env.template` file.
The key used is `TOKEN_KEYS` and it is a JSON object of token keys with a value of who owns that key as seen below.

```
TOKEN_KEYS = '{"aasdf1234":"third_party_1", "a]gghrydf1234":"third_party_1", "klasjdflkja" : "third_party_3"}'
```

If this environment variable is set, always make sure that all requests to the api have an `Authorization` header with `'Bearer <token>'` value.

Below is an example using Axios in NodeJS

```js
var axios = require('axios');
var data = JSON.stringify({
  "text": "I love you so much"
});

var config = {
  method: 'post',
  url: 'localhost:8080/detect',
  headers: { 
    'Authorization': 'Bearer aasdf1234', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```

And the same example using curl:
```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer aasdf1234" \
  http://localhost:8080/detect \
  -d '{"text":"I love you so much"}'

```

Unauthorized keys in the request will return a `403` HTTP error.

*Note: For developmental purposes, the API will still run if this environment variable is not set when running locally as described below*

Alternatively,to test the codebase add your localhost:port URL to the list of `allowed_origins` in the api.py file.


## Running Locally

From the `api/` folder:

1. First download a local copy of the ML model:

```bash
python get_model.py
``` 

2. Run the python server using the following command:

```bash
python api.py
```

In a new terminal tab `cd` into the client folder and and run the following commands
- `npm i`
- `npm run dev`

## Docker

### Requirements

* [Docker](https://docs.docker.com/install/overview/)

### Installation

Build the API with docker by running 

```bash
docker build -f "api/Dockerfile" -t kindly_api:latest "api"
```

> ⚠️  If the build errors out with `executor failed running: exit code: 137`, you are likely running out of memory. Initial installations of Docker come preconfigured by allocating 2GB of memory to Docker. You need to adjust that setting by going to **Docker Settings -> Advanced** and increasing the memory available

A container image of this API is also found on [Dockerhub](https://hub.docker.com/r/nathanfletcher/kindly_api)

Build the demo client with docker by running 

```bash
docker build -f "client/Dockerfile" -t kindly_client:latest "client"
```

A container image of the client is also found on [Dockerhub](https://hub.docker.com/r/nathanfletcher/kindly_client)

### Running

Run the API using docker with this command:

```bash
docker run --rm -it  -p 8080:8080/tcp kindly_api:latest
```

Run the demo client using docker with this command:

```bash
docker run --rm -it  -p 3000:3000/tcp kindly_client:latest
```

## Reference

### List all available endpoints

List all endpoints available through this API.

```
GET /
```
#### Code Samples

**Shell**

```bash
curl http://localhost:8080/
```

#### Default Response

```
Status: 200 OK
```
```json
{
    "detect": "/detect"
}
```

### Send text for detection endpoints

Send a piece of text and through this API to determine if it is offensive to post or not.

```
POST /
```

```PAYLOAD```
```
{
    "text":"this movie is great"
}
```
#### Code Samples

**Shell**

```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  http://localhost:8080/detect \
  -d '{"text":"this movie is great"}'
```

#### Default Response

```
Status: 200 OK
```
```json
{
    "result": {
        "not-offensive": "0.8308081",
        "offensive": "0.1691919"
        },
    "text": "this movie is great"
}

```
