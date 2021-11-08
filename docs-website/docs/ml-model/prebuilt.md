---
sidebar_position: 2
---

# Prebuilt

Kindly is currently leveraging a prebuilt model from [Huggingface](https://huggingface.co/) called [twitter-roberta-base-offensive](https://huggingface.co/cardiffnlp/twitter-roberta-base-offensive) which was deemed to be a well fleshed out model that could do the baseline task of classification and sentiment analysis. It was based on over 50 million tweets. It had examples of how to implement using both PyTorch and Tensorflow which was well documented on the Huggingface website. 

Huggingface has a Python package called [Transformers](https://huggingface.co/transformers/) which is able to pull prebuilt models from their repository into your Python code to be used in prediction. This was used to fairly quickly create the initial API for Kindly which used Python’s Flask package module to build the routes of the API.

## Transfer Learning

Transfer learning is the process of re-training an existing model with a new data set, and transfer the "learning" from the first model and adapt it to the new data set. This strategy is best used for situations where one wants to take advantage of the power of an existing model, without going through the effort of developing a model from scratch. It also also allows to train for situations where one does not have a lot of data.

The team is considering transfer learning as a benchmarking strategy to test and compare with a building from scratch strategy. Since the initial Cardiff model was developed with Twitter data presumably authored by adults, there is the case to be made for retraining the current model with the training data that we plan to obtain from kids and teenagers, so that we can sharpen the model with the specific language and expressions that are more commonly used by children.

l