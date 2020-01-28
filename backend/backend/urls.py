from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .admin import admin
from .views import (
    LandmarkViewSet,
    NearbyLandmarkViewSet,
    FavoriteLandmarkViewSet,
    RegistrationViewSet,
)

landmark_router = DefaultRouter()
landmark_router.register("landmarks", LandmarkViewSet)
landmark_router.register("nearby-landmarks", NearbyLandmarkViewSet, "nearby-landmarks")
landmark_router.register("favorite-landmarks", FavoriteLandmarkViewSet, "favorite-landmarks")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path(
        "register/",
        RegistrationViewSet.as_view({"post": "create"}),
        name="registration",
    ),
    path("", include(landmark_router.urls)),
]
