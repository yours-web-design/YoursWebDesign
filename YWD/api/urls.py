from django.conf.urls import url, include
from rest_framework import routers
from api.views import UserViewSet
import allauth

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^auth/', include('rest_auth.urls')),
    url(r'^accounts/', include('allauth.urls')),
    url('^', include('django.contrib.auth.urls')),
]