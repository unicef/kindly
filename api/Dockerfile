# Using the Python 3.9.1 image as it is a requirement for Tensorflow.
FROM python:3.9.1

WORKDIR /flask

# Copy application files to the container image.
ADD . /flask

# Exposing 8080 because it is the port used for the API
EXPOSE 8080

# Install all application dependencies
RUN pip install -r requirements.txt

# Run the web service on container startup.
CMD [ "python", "flasksample.py" ]