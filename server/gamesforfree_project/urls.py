"""
URL configuration for gamesforfree_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.http import HttpResponse
from django.conf import settings
from django.conf.urls.static import static 

#returns the index.html file from a React project
def serve_react_app_index(request):
    index_html = open('static/index.html')
    return HttpResponse(index_html)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user', include('users.urls')),
    path('games/', include('games.urls')),
    path('all/', include('games.urls')),
    path('pc/', include('games.urls')),
    path('browser/', include('games.urls')),
    path('reviews', include('reviews.urls')),
    path('ratings', include('ratings.urls')),
    # This will catch-all route in Django that is designed to serve the React app's index.html file for any URL not matched by the other defined routes.
    re_path(r'^.*$', serve_react_app_index),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# This tells Django to serve the files located in settings.MEDIA_ROOT when a request comes in for a URL starting with /media/.
# need to import static as well