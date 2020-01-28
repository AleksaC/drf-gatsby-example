from django.contrib.gis.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    favorite_landmarks = models.ManyToManyField("Landmark")


class Landmark(models.Model):
    name = models.CharField(max_length=100)
    thumbnail = models.CharField(max_length=300, default='')
    details = models.CharField(max_length=300, default='')
    coords = models.PointField()

    def __str__(self):
        return self.name
