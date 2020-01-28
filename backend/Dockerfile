FROM python:3.8-buster

ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install python3-gdal gdal-bin -y

RUN mkdir /code

WORKDIR /code

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 3000

CMD ["python", "manage.py", "runserver", "0.0.0.0:3000"]
