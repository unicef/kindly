In Machine Learning (ML) and Natural Language processing, usually the initial steps is to get your data and sort it into these categories
- Training datasets
- Validation datasets
- Training labels
- Validation labels

## Inspiration

This project would use this same format stated above. Currently it takes inspiration from the [cardiffnlp/twitter-roberta-base-offensive](https://github.com/cardiffnlp/tweeteval) model by [huggingface](https://huggingface.co/cardiffnlp/twitter-roberta-base-offensive)

For the Kindly project, the initial data gotten is in the `kindly_luis_export.json` file.
It will then be sorted into these file categories in order to start training.

The `modeling/dataset/offensive_train_text.txt` file is what has been extracted from `kindly_luis_export.json` and will be used as the source of training data. 
It will be constantly updated along with it's corresponding `offensive_train_labels.txt` file as more data is collected

Also, within this folder, there's a `mapping.txt` to show which label corresponds to each sentiment.
- 0	not-offensive
- 1	offensive

