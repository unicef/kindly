### What does this folder do?

This folder holds dowloaded tokenizer and model files.
As one of the first steps in setting up this project, it is necessary to run python `api/get_model.py`.
The script downloads tokenizer data, mappings and the model into this folder.
The code from the `api` folder will reference these items during api calls.