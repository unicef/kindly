---
sidebar_position: 2
---

# 🛠 Architecture

This project consists of three primary building blocks:

- **Python Training Server**: This server rebuilds the model using data obtained from the Continuous Integration (CI) server. Because training data can get exponentially large, it requires ideally a GPU to perform this task quickly. However, it can start with a CPU if training data is relatively small (say 30 MB - 50 MB). The model file that is generated at the end of the process is stored on the Python API Server to be used in prediction on the frontend client. In the absence of the actual server, the current implementation uses a service called Huggingface.com, where large model files and repositories are hosted to be used by data scientists.

- **Python API Server**: This server hosts the Machine Learning (ML) model and the initial Application Programming Interface (API) to check the text against. Only a single endpoint is provided currently.

- **NodeJS Client Server**: This server hosts the frontend that users can interact with. Interacts with the Python API Server to check whether the input text is offensive or not, and reports the result back to the user. The client also sends training data from a form off to GitHub to be saved in the repository as a text file.

Additionally, it also leverages the following infrastructure:

- **GitHub** hosts the source code of both the NodeJS Client Server and the Python API Server. It hosts the training data coming from the form on the Node JS Client website as text files (this seems like a convention in the ML field).

- **CI/CD Pipelines** trigger the client website and the API to be rebuilt and deployed whenever code is updated in GitHub. It also passes on updated model training data text files and model updates to the Python Training server.
