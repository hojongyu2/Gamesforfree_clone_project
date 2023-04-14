from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def games(request):
    return HttpResponse("<h1>This is from Django game</h1>")