from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
import json
import requests
import random
from django.core.paginator import Paginator

# Create your views here.

@api_view(['GET'])
def get_games(request):
    endpoint = 'https://www.freetogame.com/api/games'
    if request.method == 'GET':
        if 'get_random_three' in request.data: 
            response = requests.get(endpoint)
            response_json = response.json()
            random_three_games = random.sample(response_json, 3)
            return JsonResponse(random_three_games, safe=False) 
            #safe=False allow JsonResponse to serialize and return the list as JSON
            #If it was set as safe=True, then the data must be a dictionary.
        # elif 'get_recently_added' in request.data:
        #     response = requests.get('https://www.freetogame.com/api/games?sort-by=release-date')
        #     response_json = response.json()
        #     return JsonResponse(response_json, safe=False) 
        elif 'get_most_played' in request.data:
            response = requests.get('https://www.freetogame.com/api/games?sort-by=popularity')
            response_json = response.json()
            return JsonResponse(response_json, safe=False)
        elif 'get_recently_added' in request.data:
            limit = int(request.GET.get('limit', 10))  # Set the default limit to 10
            offset = int(request.GET.get('offset', 0))  # Set the default offset to 0

            response = requests.get('https://www.freetogame.com/api/games?sort-by=release-date')
            response_json = response.json()

            # Use Django Paginator for pagination
            paginator = Paginator(response_json, limit)
            page = paginator.page(offset // limit + 1)  # Calculate the current page number
            print('page    ', page)
            print('page.object_list    ', len(page.object_list))
            return JsonResponse(page.object_list, safe=False)    