---
sidebar_position: 3
---

# Training Data

In Machine Learning (ML) and Natural Language Processing (NLP), data is sorted in the following groups:

- Training dataset (text + labels)
- Validation dataset (text + labels)
- Testing dataset (text + label)

Kindly is currently compiling a training dataset to both [tranfer learning](prebuilt#transfer-learning) from the current model (see [cardiffnlp/twitter-roberta-base-offensive](https://github.com/cardiffnlp/tweeteval)) using data submitted by children, and [to build a new model from scratch](./build-from-scratch).

## Initial Dataset

The [initial dataset](https://github.com/unicef/kindly/tree/main/modeling/dataset) comes from the data provided by Gitanjali Rao (see [Acknowledgements](../acknowledgements)), which was exported from the proof-of-concept NLP model developed using Microsoft Azure's Language Understanding (LUIS) cloud-based engine.

## Data Collection

As part of Kindly's website, a [contribute page](https://kindly.unicef.io/contribute) has been developed to 
request training data from children. The form simulates a hypothetical chat interaction a child my have with a friend, prompting them to react to a predetermined set of prompts chosen at random.

![Data Collection](/img/ml-model/data-collection.svg)

Every time the child submits text through the form, data is both stored and submitted for analysis by the current model. The model then returns its prediction on whether it detects cyberbulling intent, and the child can validate whether the prediction is acurate or not. The validation from the user is apended to the initial data entry.

No data is collected from the user other than the text that that the child enters in the form and their validation on whether the preditcion is accurate or not. The data submission is completely anonymous.

Data submitted by children is stored pending review by UNICEF staff. The human review validates that the data is relevant and anonymizes it by removing any personal identifiable information (PII) that the user may have submited inadvertently or by mistake (e.g. replacing proper nouns with a generic reference such as "*@user*"). The data cleansing includes the removal of individual names, physical or email addresses, school names, phone numbers or any other personal or device identifiers, as well as location data. At the discretion of UNICEF staff, if we can think of any other data (or combinations thereof) that may lead back to a child, then that will also be removed. After the new data has been reviewed, it is then added to Kindly's [open dataset](https://github.com/unicef/kindly/tree/main/modeling/dataset). This open dataset is used to periodically re-train and improve the existing machine learning model.
