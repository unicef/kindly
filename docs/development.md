# Development

This file documents how to set up and run the code in this repository in your local development environment. For a production environment using Docker images, refer to the [deployment](deployment.md) documentation and the [API Documentation](api.md).

## Requirements

Please make sure that your development environment has the following prerequisites:
- NodeJS 16
- Python 3

## Installation

1. Clone this repo:
   - SSL:
   ```bash
   git clone git@github.com:unicef/kindly.git
   ```
   - HTTPS:
   ```bash
   git clone https://github.com/unicef/kindly.git
   ```
2. Using a command-line terminal of your choice, `cd` into the api folder and create a [Python Virtual Environment](https://docs.python.org/3/library/venv.html):

  ```bash
  cd kindly/api
  python3 -m venv env
  
  ```

3. Activate your virtual environment (you will run this step everytime you want to do work in your local development environment):

  ```bash
  source env/bin/activate
  
  ```
  for windows
  ```shell 
   your-base-directory\kindly\api> .\env\Scripts\activate.bat

  ``` 

4. Upgrade your local version of `pip`:

  ```bash
  pip install --upgrade pip
  ```

5. Install the api dependencies:

  ```bash
  pip install -r requirements.txt
  ```

  ⚠️ *This configuration is known to work with Python 3.8.0. Other versions of Python may have different dependencies, which will require different versions of `requirements.txt`, for example, if you have Python 3.6, try the following instead: `pip install -r requirements.python-3.6.8.txt`. We will add more configuration files as we try other versions.*

6. Change into the client folder to install the client dependencies:

  ```bash
  cd ../client
  npm i
  ```

## Configuration

The code for this repository defaults to the production environment configuration, where the API server is configured to only allow requests from a set of [allowed origins](https://github.com/unicef/kindly/blob/7ee69561eaa53a77074b71ebcf876a8c29bb5878/api/api.py#L22) or accept requests that include an Authorization Bearer token set in production.

For development purposes, you can add your localhost to the list of allowed_origins or include an authorization token in your request as documented in the two subsections below.

*Note: If you haven't created a new `.env` file with the `TOKEN_KEYS`, you will recieve a `500` error when trying to submit words to check on the site.
If keys are unauthorized it will return a `403` HTTP error.*

### Allowed Origins

Add the client address `http://localhost:3000` to the [allowed_origins](https://github.com/unicef/kindly/blob/7ee69561eaa53a77074b71ebcf876a8c29bb5878/api/api.py#L22), so that it reads:

```python
allowed_origins = ["https://unicef.org","https://kindly-client.azurewebsites.net","https://kindly-api.azurewebsites.net", "http://localhost:3000"]

```

### Environment Variables

You can set Authorization headers using environment variables. This repository provides a sample template `.env.template` file in the root folder that you need to copy into a new file. The code below will create a copy to the `.env` file:

```bash
cp .env.template .env

```

The key used is `TOKEN_KEYS` and it is a JSON object of token keys with a value of who owns that key as seen below.

```
TOKEN_KEYS = '{"aasdf1234":"third_party_1", "a]gghrydf1234":"third_party_1", "klasjdflkja" : "third_party_3"}'
```

## Running Locally

From the `api/` folder:

1. First activate your Python Virtual Environment that you created in the [Installation](#Installation) section above:

  ```bash
  cd api
  source env/bin/activate
  ```

2. Download a local copy of the ML model (you only have to run this once):

  ```bash
  python get_model.py
  ``` 

3. Run the python server using the following command:

  ```bash
  python api.py
  ```

4. On a different terminal window/tab, `cd` into the client folder and and run the following command:

  ```bash
  npm run dev
  
  ```

## Making Request with Authorization Tokens

Test requests using the following 2 methods. Python server must be running and you must have an `.env` file with the `TOKEN_KEYS`.

Your client HTTP requests to the API must include an `Authorization` header with a `'Bearer <token>'` value:

```
"Authorization": "Bearer YOUR-TOKEN-GOES-HERE'"

```

Unauthorized keys in the request will return a `403` HTTP error.

Below is an example using curl:
```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer aasdf1234" \
  http://localhost:8080/detect \
  -d '{"text":"I love you so much"}'

```

And the same example using Axios in NodeJS

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
