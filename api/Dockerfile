FROM python:3.9.1
ADD . /flask
WORKDIR /flask
EXPOSE 8080
RUN pip install -r requirements.txt
CMD [ "python", "flasksample.py" ]