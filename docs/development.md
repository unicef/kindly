# Development

Please make sure that your development environment has the following prerequisites:
- NodeJS 16
- Python 3
    - Using a command-line terminal of your choice, `cd` into the api folder.
    - Run the following commands to complete your environment
    - `pip install --upgrade pip`
    - `pip install tensorflow`
    - `pip install -r requirements.txt`
    - Install pytorch by going to (their website)[https://pytorch.org/get-started/locally/] to know how to do it with your operating system. However, for this mac configuration in this project you can use `pip` by running `pip install torch torchvision`

## Running Locally

From the root of the application, run the python server using the following command `python api/flasksample.py`

In a new terminal tab `cd` into the client folder and and run the following commands
- `npm i`
- `npm run dev`

## Docker

### Requirements

* [Docker](https://docs.docker.com/install/overview/)

### Installation

Build the API with docker by running 

```bash
docker build --pull --rm -f "api/Dockerfile" -t kindly_api:latest "api"
```

A container image of this API is also found on [Dockerhub](https://hub.docker.com/r/nathanfletcher/kindly_api)

Build the demo client with docker by running 

```bash
docker build --pull --rm -f "client/Dockerfile" -t kindly_client_demo:latest "client"
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
