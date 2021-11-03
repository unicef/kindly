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
   - Linux/OSX:
   ```bash
   source env/bin/activate
   ```
   - Windows:
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

  ⚠️&nbsp;&nbsp;*This configuration is known to work with Python 3.8.0. Other versions of Python may have different dependencies, which will require different versions of `requirements.txt`, for example, if you have Python 3.6, try the following instead:*
  ```bash
  pip install -r requirements.python-3.6.8.txt
  ```
  *We will add more configuration files as we try other versions.*

6. Change into the client folder to install the client dependencies:

  ```bash
  cd ../client
  npm i
  ```

## Configuration

The code for this repository defaults to the production environment configuration, where the API server is configured to only allow requests from a set of **allowed origins** or accept requests that include an **Authorization Bearer token** set in production. Both settings are configured through environment variables, which you can configure locally in your development environment.

*⚠️&nbsp;&nbsp;Note: If you haven't created a new `.env` as per the instructions below, you will recieve a `500` error when trying to submit words to check on the site. If keys are unauthorized it will return a `403` HTTP error.*

### Environment Variables

Use environment variables to set the configuration needed for the project. Environment variables can conveniently be configured through a `.env` file in the root folder of this repository. This repository provides a sample template `.env.template` file in the root folder that you need to copy into a new file. The code below will create a copy `.env.template` into `.env`:

```bash
cp .env.template .env

```

You can further edit your `.env` file you to update any urls, or authentication tokens if needed.

#### Authorization Tokens

Authorization tokens are configured through the environment variable named `TOKEN_KEYS`, and is a JSON object of token keys with a value of who owns that key as illustrated below.

```
TOKEN_KEYS = '{"aasdf1234":"third_party_1", "a]gghrydf1234":"third_party_1", "klasjdflkja" : "third_party_3"}'
```

#### Allowed Origins

`ALLOWED_ORIGINS` is an array of the domains where a request can originate from that will be accepted by this API, such as:

```python
ALLOWED_ORIGINS = ["https://unicef.org","https://kindly-client.azurewebsites.net","https://kindly-api.azurewebsites.net", "http://localhost:3000"]

```

As you will notice from above, the provided `.env.template` already lists `http://localhost:3000`, which is where the client server runs.

## Running Locally

From the `api/` folder:

1. First activate your Python Virtual Environment that you created in the [Installation](#Installation) section above:
  
   - Linux/OSX:
   ```bash
   source env/bin/activate
   ```

   - Windows:
   ```shell
   your-base-directory\kindly\api> .\env\Scripts\activate.bat
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

## Test Making Requests with Authorization Tokens

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

## Test Making Requests with Allowed Origin

Below is an example using curl, where you can set your origin in the header of the request:

```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  http://localhost:8080/detect \
  -d '{"text":"I love you so much"}'
```

## Testing

Unit test for endpoints have been set up using pytest.

To run tests from within the `api/` folder:
```bash
pytest
```
`'/'` endpoint has 2 associated tests:
`test_api_glossary()` for success response from `'/'` endpoint
`test_api_glossary_403()` for `403` response if not authorised

`'/test-ui'` has 1 associated test:
`test_welcome()` for success response from `'/test-ui'` endpoint

`'/detect'` endpoint has 4 associated tests:
`test_detect()` for success response from `/detect` endpoint
`test_detect_403()` for `403` response if not authorised
`test_detect_offensive()` to test for correct response from an offensive term
`test_detect_not_offensive()` to test for correct response from a non-offensive term

`'/train'` endpoint, tests pending

`test_404()` for `404` error with invalid endpoint


## Setting up linting

Pylint has been set up for all Python files in the `/api` folder. It enforces PEP8 coding standard, trying to follow it as close as possible. The pylint test can be run with the following command to check for errors:

```bash
pylint [file.py]
```

Pylint gives information on errors and their respective lines in the code to mak debugging easier. A pre-commit hook has been set up to ensure that commits cannot be made if there are linting errors.
