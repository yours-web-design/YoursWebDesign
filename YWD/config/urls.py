from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import RedirectView

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include('api.urls')),
    url(r'^accounts/login/',RedirectView.as_view(url='http://localhost:8000/api/auth/login/'))
]
