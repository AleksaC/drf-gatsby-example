from django.contrib.gis import admin

from .models import Landmark

admin.site.register(Landmark, admin.OSMGeoAdmin)
