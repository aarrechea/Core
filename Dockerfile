# pull official base image
# alpine image is stored in what is called a Docker registry. This is a storage and distribution
# system for Docker images. https://hub.docker.com/
FROM python:3.10-alpine



# Working directory. This directory will contain the code of the running Django project
WORKDIR /app



# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1



# Adding the required dependencies for Postgres and Pillow to the Docker image
# installing psycopg2 dependencies
RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev jpeg-dev zlib-dev



# Intalling python dependencies
COPY requirements.txt /app/requirements.txt
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt



# Copy over the whole project itself. Adding app
COPY . .



# It is not necesary in Docker Compose
# Exposing port 8000 of the container for access to the other applications or the machine,
# run the migrations, and start the Django server.
#EXPOSE 8000
#CMD [ "python", "manage.py", "migrate" ]
#CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000"]



