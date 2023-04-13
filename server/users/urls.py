from django.contrib import admin
from django.urls import path
from .import views

urlpatterns = [
    path('', views.auth_user, name='auth_user'),
]
