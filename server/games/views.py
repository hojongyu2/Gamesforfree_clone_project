from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, FileResponse
from rest_framework.decorators import api_view
import json
import requests
import random
from django.core.paginator import Paginator
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

@api_view(['GET'])
def get_games(request):
    try:
        ## reference from https://rapidapi.com/digiwalls/api/free-to-play-games-database
        endpoint = "https://free-to-play-games-database.p.rapidapi.com/api/games"
        headers = {
            "X-RapidAPI-Key": "3c71b2383fmsh214b26af632666ep108d9fjsn5f6a9ccd4858",
            "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com"
        }
        
        if request.method == 'GET':
            if request.GET.get('get_random_three'): 
                response = requests.request("GET", endpoint, headers=headers)
                response_json = response.json()
                random_three_games = random.sample(response_json, 3)
                return JsonResponse(random_three_games, safe=False) 
                #safe=False allow JsonResponse to serialize and return the list as JSON
                #If it was set as safe=True, then the data must be a dictionary.
                
            elif request.GET.get('get_all'):
                response = requests.request("GET", endpoint, headers=headers)
                response_json = response.json()
                return JsonResponse(response_json, safe=False) 
            
            elif request.GET.get('get_detail'):
                query_id = request.GET.get('get_detail') # get value from params
                endpoint = "https://free-to-play-games-database.p.rapidapi.com/api/game"
                querystring = {"id":query_id} # assign param value here
                response = requests.request("GET", endpoint, headers=headers, params=querystring)
                response_json = response.json()
                return JsonResponse(response_json, safe=False) 
            
            else:
                
                querystring = {} 
                # checks if the 'platform' query parameter is present in the GET request. If it exists, the code inside the if block is executed.
                if request.GET.get('platform'):
                    querystring['platform'] = request.GET['platform']
                    
                if request.GET.get('category'):
                    querystring['category'] = request.GET['category']

                if request.GET.get('sort-by'):
                    querystring['sort-by'] = request.GET['sort-by']

                # the requests library is used to make an HTTP GET request to the specified API endpoint and this method takes four arguments.
                response = requests.request("GET", endpoint, headers=headers, params=querystring) #
                response_json = response.json() # Turn into Python dictionary
                return JsonResponse(response_json, safe=False)
    
    except Exception as e:
        return HttpResponse(str(e), status=500)
    
            ### Sort games
            # elif request.GET.get('sort-by'):
            #     if request.GET.get('sort-by') == "popularity":
            #         querystring = {"sort-by":"popularity"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
                
            #     if request.GET.get('sort-by') == "release-date":
            #         querystring = {"sort-by":"release-date"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         print(len(response_json))
            #         return JsonResponse(response_json, safe=False)    
                
            #     if request.GET.get('sort-by') == "relevance":
            #         querystring = {"sort-by":"relevance"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         print(len(response_json))
            #         return JsonResponse(response_json, safe=False)    
                
            #     if request.GET.get('sort-by') == "alphabetical":
            #         querystring = {"sort-by":"alphabetical"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         print(len(response_json))
            #         return JsonResponse(response_json, safe=False)    
            
            # ### Game by platform
            # elif request.GET.get('platform'):
            #     if request.GET.get('platform') == "pc":
            #         querystring = {"platform":"pc"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
                
            #     if request.GET.get('platform') == "browser":
            #         querystring = {"platform":"browser"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
                
            # # Game by Category
            # elif request.GET.get('category'):
            #     if request.GET.get('category') == "mmo":
            #         querystring = {"category":"mmo"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
                
            #     if request.GET.get('category') == "mmorpg":
            #         querystring = {"category":"mmorpg"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
            
            #     if request.GET.get('category') == "shooter":
            #         querystring = {"category":"shooter"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
            
            #     if request.GET.get('category') == "strategy":
            #         querystring = {"category":"strategy"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
            
            #     if request.GET.get('category') == "moba":
            #         querystring = {"category":"moba"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
            
            #     if request.GET.get('category') == "card":
            #         querystring = {"category":"card"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
            
            #     if request.GET.get('category') == "racing":
            #         querystring = {"category":"racing"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
            
            #     if request.GET.get('category') == "sports":
            #         querystring = {"category":"sports"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
            
            #     if request.GET.get('category') == "social":
            #         querystring = {"category":"social"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
            
            #     if request.GET.get('category') == "fighting":
            #         querystring = {"category":"fighting"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
            
            #     if request.GET.get('category') == "mmofps":
            #         querystring = {"category":"mmofps"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
            
            #     if request.GET.get('category') == "action-rpg":
            #         querystring = {"category":"action-rpg"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
            
            #     if request.GET.get('category') == "sandbox":
            #         querystring = {"category":"sandbox"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
            
            #     if request.GET.get('category') == "open-world":
            #         querystring = {"category":"open-world"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
            
            #     if request.GET.get('category') == "survival":
            #         querystring = {"category":"survival"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
            
            #     if request.GET.get('category') == "battle-royale":
            #         querystring = {"category":"battle-royale"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
                
            #     if request.GET.get('category') == "mmotps":
            #         querystring = {"category":"mmotps"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
                
            #     if request.GET.get('category') == "anime":
            #         querystring = {"category":"anime"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
                
            #     if request.GET.get('category') == "mmotps":
            #         querystring = {"category":"mmotps"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
                
            #     if request.GET.get('category') == "pvp":
            #         querystring = {"category":"pvp"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
                
            #     if request.GET.get('category') == "pve":
            #         querystring = {"category":"pve"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
                
            #     if request.GET.get('category') == "pixel":
            #         querystring = {"category":"pixel"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
                
            #     if request.GET.get('category') == "mmorts":
            #         querystring = {"category":"mmorts"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
                
            #     if request.GET.get('category') == "fantasy":
            #         querystring = {"category":"fantasy"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
                
            #     if request.GET.get('category') == "sci-fi":
            #         querystring = {"category":"sci-fi"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
                
            #     if request.GET.get('category') == "action":
            #         querystring = {"category":"action"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
                
            #     if request.GET.get('category') == "voxel":
            #         querystring = {"category":"voxel"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
                
            #     if request.GET.get('category') == "zombie":
            #         querystring = {"category":"zombie"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
                
            #     if request.GET.get('category') == "turn-based":
            #         querystring = {"category":"turn-based"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
                
            #     if request.GET.get('category') == "first-person":
            #         querystring = {"category":"first-person"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
                
            #     if request.GET.get('category') == "third-Person":
            #         querystring = {"category":"third-Person"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
                
            #     if request.GET.get('category') == "top-down":
            #         querystring = {"category":"top-down"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
                
            #     if request.GET.get('category') == "3d":
            #         querystring = {"category":"3d"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
                
            #     if request.GET.get('category') == "2d":
            #         querystring = {"category":"2d"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
                
            #     if request.GET.get('category') == "tank":
            #         querystring = {"category":"tank"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
                
            #     if request.GET.get('category') == "space":
            #         querystring = {"category":"space"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
                
            #     if request.GET.get('category') == "sailing":
            #         querystring = {"category":"sailing"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
                
            #     if request.GET.get('category') == "side-scroller":
            #         querystring = {"category":"side-scroller"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
                
            #     if request.GET.get('category') == "superhero":
            #         querystring = {"category":"superhero"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)
                
            #     if request.GET.get('category') == "permadeath":
            #         querystring = {"category":"permadeath"}
            #         response = requests.request("GET", endpoint, headers=headers, params=querystring)
            #         response_json = response.json()
            #         return JsonResponse(response_json, safe=False)