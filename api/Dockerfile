# Lightweight Python base — no longer requires TensorFlow as a runtime dependency
FROM python:3.11-slim

# Change working directory
WORKDIR /flask

# Copy list of required dependencies to the container image
ADD requirements.docker.txt /flask

# Upgrade pip to resolve modern package versions
RUN pip install --upgrade pip

# Install all application dependencies (PyTorch CPU wheel for lightweight container)
RUN pip install -r requirements.docker.txt \
    --extra-index-url https://download.pytorch.org/whl/cpu

# Add code to cache ML model inside image
ADD get_model.py /flask

# Download model into ./model (from HuggingFace hub)
RUN python get_model.py

# Download ML mappings
RUN curl -LJ https://raw.githubusercontent.com/cardiffnlp/tweeteval/main/datasets/offensive/mapping.txt -o model/mapping.txt

# Copy source code files
ADD api.py /flask
ADD templates /flask/templates

# Exposing 8080 because it is the port used for the API
EXPOSE 8080

# Run the web service on container startup
CMD [ "python", "api.py" ]
