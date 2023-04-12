from django.shortcuts import render
from django.http import HttpResponse
from .models import *
# Create your views here.

def home(request):
    the_index = open('static/index.html')
    return HttpResponse(the_index)