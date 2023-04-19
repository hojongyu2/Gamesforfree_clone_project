from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from .import views
urlpatterns = [
    path('', views.get_games, name="game"),
]
