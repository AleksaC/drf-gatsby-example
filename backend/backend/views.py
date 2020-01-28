from django.contrib.gis.geos import Point
from django.contrib.gis.measure import Distance
from rest_framework import viewsets, permissions
from rest_framework.response import Response

from .models import Landmark
from .permissions import IsAuthenticated
from .serializers import LandmarkSerializer, UserSerializer


class RegistrationViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def create(self, request):
        serialized = UserSerializer(data=request.data)
        if serialized.is_valid():
            serialized.save()
            return Response(status=201)
        else:
            return Response(serialized.errors, status=400)


class LandmarkViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Landmark.objects.all()
    serializer_class = LandmarkSerializer
    permission_classes = [permissions.AllowAny]


class FavoriteLandmarkViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        queryset = request.user.favorite_landmarks.all()
        serializer = LandmarkSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        landmark = Landmark.objects.get(pk=request.data["id"])
        request.user.favorite_landmarks.add(landmark)
        return Response(status=201)

    def destroy(self, request, pk=None):
        landmark = Landmark.objects.get(pk=pk)
        request.user.favorite_landmarks.remove(landmark)
        return Response(status=204)


class NearbyLandmarkViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        latitude = float(request.GET.get("latitude", 0))
        longitude = float(request.GET.get("longitude", 0))
        radius = float(request.GET.get("radius", 2))

        current_location = Point(longitude, latitude)
        queryset = Landmark.objects.filter(
            coords__distance_lt=(current_location, Distance(km=radius))
        )
        serializer = LandmarkSerializer(queryset, many=True)

        return Response(serializer.data)
