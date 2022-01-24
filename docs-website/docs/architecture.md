---
sidebar_position: 2
---

# 🛠 Architecture

![Kindly Architecture](/img/kindly-architecture.svg)

This project consists of three primary building blocks:

- **API Server**: This server hosts the Machine Learning (ML) model and the initial Application Programming Interface (API) to check the text against. Only a single endpoint is provided currently.

- **Machine Learning (ML) Training Server**: This server rebuilds the model using data obtained from the Continuous Integration (CI) server. Because training data can get exponentially large, it requires ideally a GPU to perform this task quickly. However, it can start with a CPU if training data is relatively small (say 30 MB - 50 MB). The model file that is generated at the end of the process is stored on the Python API Server to be used in prediction on the frontend client. In the absence of the actual server, the current implementation uses a service called Huggingface.com, where large model files and repositories are hosted to be used by data scientists.

- **Open-Source Code Repository**: Hosts the source code of the Python API Server, and the open dataset used for training the ML model. It also hosts the documentation site that you are reading right now 😉

Additionally, it also leverages the following complementary infrastructure:

- **Web Client**: A very simple user interface (UI) is provided for demonstration purposes, so that users can try out and test the API. This provides a frontend that interacts with the API Server to check whether the input text is offensive or not, and reports the result back to the user. A different client page is set up for children to contribute to the [training dataset](./ml-model/training-data), by sending input data into temporary storage for review, which later gets added to the open dataset.

- **Continuous Integration and Continuous Development (CI/CD) Pipelines** trigger the client website and the API to be rebuilt and deployed whenever code is updated in GitHub. It also passes on updated model training data text files and model updates to the ML Training server.
