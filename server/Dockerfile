FROM ubuntu:jammy

WORKDIR /app
COPY . .

EXPOSE 9090

RUN apt-get update && apt upgrade -y
RUN apt-get install python3-dev python3-venv -y
RUN python3 -m venv venv
RUN venv/bin/pip install --upgrade pip
RUN venv/bin/pip install -r requirements.txt

# TODO: gunicorn instead of built-in
CMD ["./venv/bin/python", "app.py"]