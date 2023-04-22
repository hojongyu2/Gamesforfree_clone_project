from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
# Create your views here.

api_view(['POST'])
def create_review(request):
    # if request.method == 'POST':
        
    return  HttpResponse("<h1>This is from django reviews</h1>")