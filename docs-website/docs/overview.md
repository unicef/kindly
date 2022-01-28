---
sidebar_position: 2
---

# 🗺 Overview

This is a broad overview of the Kindly App and how all the components fit together. There are currently 2 GitHub repos associated with Kindly - the [Kindly](https://github.com/unicef/kindly) repo which contains the API, web client and ML training server, and the [Kindly Website](https://github.com/unicef/kindly-website) repo which contains the front-facing [website](https://kindly.unicef.io) which includes details, contact info, and the contribution form.

## Kindly

// web client is only for demo and development purposes and is never in production

## Kindly Website
The [Kindly Website repo](https://github.com/unicef/kindly-website) found in the UNICEF organisation is where the development code is stored. However, the Kindly website is actually hosted through Cloudflare, with the fork created by Victor at [lacabra/kindly-website](https://github.com/lacabra/kindly-website). The workflow [`push-downstream.yml`](https://github.com/unicef/kindly-website/blob/main/.github/workflows/push-downstream.yml) is a continuous integration solution which will push any changes committed on unicef/kindly-website downstream to lacabra/kindly-website.