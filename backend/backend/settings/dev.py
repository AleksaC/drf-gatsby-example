import os

from .common import *

SECRET_KEY = "5z!=r3pah3sdi1%3)@317*vnwdswra8lxyrz8175&q8z%6%z&a"

DEBUG = True

ALLOWED_HOSTS = ["*"]

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": os.environ.get("DB_NAME", "gis"),
        "USER": os.environ.get("DB_USER", "aleksa"),
        "PASSWORD": os.environ.get("DB_PASSWORD", "projekat"),
        "HOST": os.environ.get("DB_HOST", "localhost"),
        "PORT": os.environ.get("DB_PORT", "5432"),
    }
}
