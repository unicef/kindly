---
sidebar_position: 2
---

# Deployment

This file documents the production set up for running the code in this repository using dockerized images. Refer to the [API Documentation](api.md) for the production endpoints. For a local development configuration, refer to the [development](development.md) documentation.

## Requirements

- [Docker](https://docs.docker.com/install/overview/)

* For Windows users it is advisable to use Windows Subsystem for Linux(WSL)
* [WSL Setup](https://docs.docker.com/desktop/windows/wsl/)

## Installation

1. Clone this code repository:

   - SSL:

   ```bash
   git clone git@github.com:unicef/kindly.git
   ```

   - HTTPS:

   ```bash
   git clone https://github.com/unicef/kindly.git
   ```

2. Build the API with Docker by running:

   ```bash
   docker build -f "api/Dockerfile" -t kindly_api:latest "api"
   ```

> ⚠️ If the build errors out with `executor failed running: exit code: 137`, you are likely running out of memory. Initial installations of Docker come preconfigured by allocating 2GB of memory to Docker. You need to adjust that setting by going to **Docker Settings -> Advanced** and increasing the memory available

    A container image of this API is also found on [Dockerhub](https://hub.docker.com/r/nathanfletcher/kindly_api)

3. Build the demo client with Docker by running

   ```bash
   docker build -f "client/Dockerfile" -t kindly_client:latest "client"
   ```

   A container image of the client is also found on [Dockerhub](https://hub.docker.com/r/nathanfletcher/kindly_client)

### Running

Run the API using docker with this command:

```bash
docker run --rm -it -e "TOKEN_KEYS='{"aasdf1234":"third_party_1", "a]gghrydf1234":"third_party_1", "klasjdflkja" : "third_party_3"}'"  -p 8080:8080/tcp kindly_api:latest
```

Run the demo client using docker with this command:

```bash
docker run --rm -it  -p 3000:3000/tcp kindly_client:latest
```
