In Machine Learning (ML) and Natural Language processing, usually the initial steps is to get your data and sort it into 3 categories
- Training datasets
- Validation datasets
- Training labels
- Validation labels

For the Kindly project, the initial data gotten is in the `kindly_luis_export.json` file.
It will then be sorted into these file categories in order to start training.
The `modeling/dataset/offensive.txt` file is what has been extracted from `kindly_luis_export.json` and will be used as the source of training data.