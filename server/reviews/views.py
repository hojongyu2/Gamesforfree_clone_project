from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def reviews(request):
    return  HttpResponse("<h1>This is from django reviews</h1>")