from .common import *

SECRET_KEY = "5z!=r3pah3sdi1%3)@317*vnwdswra8lxyrz8175&q8z%6%z&a"

DEBUG = True

ALLOWED_HOSTS = ["*"]

DATABASES = {
    "default": {
        "ENGINE": "django.contrib.gis.db.backends.postgis",
        "NAME": "gis",
        "USER": "aleksa",
        "PASSWORD": "projekat",
        "HOST": "db",
        "PORT": "5432",
    },
}
