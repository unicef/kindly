---
sidebar_position: 2
---

# 🗺 Overview

This is a broad overview of the Kindly App and how all the components fit together. There are currently 2 GitHub repos associated with Kindly - the [Kindly](https://github.com/unicef/kindly) repo which contains the API, web client and ML training server, and the [Kindly Website](https://github.com/unicef/kindly-website) repo which contains the front-facing [website](https://kindly.unicef.io) which includes details, contact info, and the contribution form.

## Kindly
The [Kindly API repo](https://github.com/unicef/kindly) contains the [API](https://github.com/unicef/kindly/tree/main/api), the [web client](https://github.com/unicef/kindly/tree/main/client), and the [ML training server](https://github.com/unicef/kindly/tree/main/modeling). It also houses the [docs website](https://github.com/unicef/kindly/tree/main/docs-website). More information on how they fit together is below.

### API
The [API](https://github.com/unicef/kindly/tree/main/api) includes the [application](https://github.com/unicef/kindly/tree/main/api/api.py), where the endpoints and functions are found, as well as [unit tests](https://github.com/unicef/kindly/blob/main/api/test_api.py) which cover the endpoints.
There are currently 3 endpoints, with 1 more for ML training which is yet to be completed. The `'/'` route returns the api glossary, with the functional and relevant endpoints. The `'/test-ui'` endpoint renders the [`index.html` template](https://github.com/unicef/kindly/tree/main/api/templates) for testing. The `'/detect'` endpoint is used to process input text.

#### Tests
The [unit tests](https://github.com/unicef/kindly/blob/main/api/test_api.py) are set up using pytest, and will run with the [`main.yml`](https://github.com/unicef/kindly/blob/main/.github/workflows/main.yml) workflow. They target the API url `localhost:8080` and test for success, 403 error, 404 error and 400 error (see [development docs](technical/development#testing) for a detailed outline).

### Web Client
The [web client](https://github.com/unicef/kindly/tree/main/client) is a basic frontend and is only for demo and development purposes when working on the API and is never used in production. It contains a page to [test](https://github.com/unicef/kindly/blob/main/client/pages/index.vue) the API and a page to [contribute](https://github.com/unicef/kindly/blob/main/client/pages/contribute.vue), although this is not functioning at the moment.

### ML training server
To learn more about how the machine learning training server, see the [ML Model docs](ml-model/overview). Kindly is currently using a [prebuilt](ml-model/prebuilt) model for detecting toxic messaging, the [twitter-roberta-base-offensive](https://huggingface.co/cardiffnlp/twitter-roberta-base-offensive) model. We are concurrently collecting new training data to [transfer learning](ml-model/prebuilt#transfer-learning), where we use an existing model to validate new training data while adapting the results to be relevant to what we need for our model, in this case, to be relevant for language used by children and young people.

## Kindly Website
The [Kindly Website repo](https://github.com/unicef/kindly-website) found in the [UNICEF Github organisation](https://github.com/unicef) is where the development code is stored. However, the Kindly website is actually hosted through Cloudflare, with the fork created by Victor at [lacabra/kindly-website](https://github.com/lacabra/kindly-website). The workflow [`push-downstream.yml`](https://github.com/unicef/kindly-website/blob/main/.github/workflows/push-downstream.yml) is a continuous integration solution which will push any changes committed on unicef/kindly-website downstream to lacabra/kindly-website.

### The Contribution Form
The [Kindly form](https://github.com/unicef/kindly-website/blob/main/src/components/KindlyForm.js) on the [contribution page](https://github.com/unicef/kindly-website/blob/main/src/Contribute.js) is linked to the Kindly API and Google Sheets to collect training data. When someone enters a phrase into the form, the input text is passed to the [`/detect` endpoint](https://github.com/unicef/kindly/blob/6a39f09eec60f8f3d0c0809e35aa9352075e46ca/api/api.py#L50) of the API and the results are returned, the user will then be prompted to confirm whether the phrase has been correctly classified as either cyberbullying or not. The phrase and the intent are then passed through to the [Google Training Sheet](https://github.com/unicef/kindly/blob/main/scripts/OutputFile.gs) as `formData` in [`handleFeedback`](https://github.com/unicef/kindly-website/blob/0556e79a3b1393a55df68e46cd663990a4d40b91/src/components/KindlyForm.js#L70).

### Testing Kindly Functionality
Users can test Kindly on the main page using the [Kindly form](https://github.com/unicef/kindly-website/blob/main/src/components/KindlyForm.js), which is linked only to the [`/detect` endpoint](https://github.com/unicef/kindly/blob/6a39f09eec60f8f3d0c0809e35aa9352075e46ca/api/api.py#L50) of the API. This will return a result indicating whether the submitted phrase is considered cyberbullying or not.
