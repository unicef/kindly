# Using the Python 3.9.1 image as it is a requirement for Tensorflow.
FROM tensorflow/tensorflow:2.5.1

# Change working directory (will create if it does not exist)
WORKDIR /flask

# Copy list of required dependecies to the container image.
ADD requirements.docker.txt /flask

# Install all application dependencies
RUN pip install -r requirements.docker.txt

# Add code to cache ML model inside image
ADD get_model.py /flask

# Download model into ./model
RUN python get_model.py

# Download ML mappings
RUN curl -LJ https://raw.githubusercontent.com/cardiffnlp/tweeteval/main/datasets/offensive/mapping.txt -o model/mapping.txt

# Copy source code files
ADD api.py /flask
ADD templates /flask/templates

# Exposing 8080 because it is the port used for the API
EXPOSE 8080

# Run the web service on container startup.
CMD [ "python", "api.py" ]
