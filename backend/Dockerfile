FROM python:3.8-buster

ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install \
    gdal-bin \
    python3-gdal \
    -y

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 3000

CMD ["python", "manage.py", "runserver", "0.0.0.0:3000"]
