---
sidebar_position: 3
---

# 🧩 API integration

**If you'd like to add the Kindly API to a project you're working on, get in touch with us!**

There is currently one available endpoint for Kindly :`'/detect'`.
To read more in-depth, go check out our [API development docs](../api.md).

## For those who are new to integrating APIs into your own project, here's some guidance!

You'll be accessing the `/detect` endpoint in order to check whether some input text has cyberbullying intent.
To integrate Kindly into your project you will need a couple of things to get started:
- text input functionality where there is a trigger to send the text as a request to an endpoint.
    - see the client development site for an example of this on the [index page](https://github.com/unicef/kindly/blob/main/client/pages/index.vue)
- input text that's in json format
```PAYLOAD```
```
{
    "text":"this movie is great"
}
```
- authorization headers and/or token keys

Test basic functionality and integration with your project by setting up the api on your local development environment. Follow the instructions on the [development docs](../technical/development.md) to get the API up and running. You won't need the web client and can just send requests to the endpoint on your local environment.