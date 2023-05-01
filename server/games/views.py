from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, QueryDict
from rest_framework.decorators import api_view
import json
import re
import requests
import random
from django.core.paginator import Paginator
from django.core.serializers import serialize
from django.db.models import F
# import models 
from .models import *
#dot
import os
from dotenv import load_dotenv
load_dotenv()
# Create your views here.

@api_view(['GET', 'POST', 'PUT'])
def handle_game_data(request):
    if request.method == 'GET':
        try:
            ## reference from https://rapidapi.com/digiwalls/api/free-to-play-games-database
            rapidapi_key = os.getenv("RAPIDAPI_KEY")
            endpoint = "https://free-to-play-games-database.p.rapidapi.com/api/games"
            headers = {
                "X-RapidAPI-Key": rapidapi_key,
                "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com"
            }
            # get three games randomly 
            if request.GET.get('get_random_three'): 
                response = requests.request("GET", endpoint, headers=headers)
                response_json = response.json()
                random_three_games = random.sample(response_json, 3)
                return JsonResponse(random_three_games, safe=False) 
                #safe=False allow JsonResponse to serialize and return the list as JSON
                #If it was set as safe=True, then the data must be a dictionary.
            
            # get all games
            elif request.GET.get('get_all'):
                response = requests.request("GET", endpoint, headers=headers)
                response_json = response.json()
                return JsonResponse(response_json, safe=False) 
            
            # get game by page number
            elif request.GET.get('page'):
                response = requests.request("GET", endpoint, headers=headers)
                response_json = response.json()
                page_number = int(request.GET.get('page', 1))# page number from the query parameters, default is 1
                page_size = 20  # number of items per page

                start_index = (page_number - 1) * page_size
                end_index = start_index + page_size

                paginated_games = response_json[start_index:end_index] # slice the result and return
                return JsonResponse(paginated_games, safe=False)

            # get details of the game
            elif request.GET.get('get_detail'):
                query_id = request.GET.get('get_detail') # get value from params
                endpoint = "https://free-to-play-games-database.p.rapidapi.com/api/game"
                querystring = {"id":query_id} # assign param value here
                response = requests.request("GET", endpoint, headers=headers, params=querystring)
                response_json = response.json()
                return JsonResponse(response_json, safe=False) 
            
            # search game by name
            elif request.GET.get('search_term'):
                search_term = request.GET.get('search_term')
                response = requests.request("GET", endpoint, headers=headers)
                response_json = response.json()
                
                # Helper function that uses reges to remove spaces and special characters. Then change it to all lowercased
                def filtered_title(title):
                    return re.sub('[\W_]+', '', title).lower()
                
                found_games = []
                
                for game_data in response_json:
                    game_title = game_data['title']
                    filtered_game_title = filtered_title(game_title)
                    # Append it to the found_games array when it matches with either of the conditions
                    if search_term in filtered_game_title or search_term == filtered_game_title:
                        found_games.append(game_data)
                        
                return JsonResponse(found_games, safe=False) 
            
            # get favorite game list
            elif request.GET.get('my_game_list'):
                if request.user.is_authenticated:
                    try:
                        # get only current users fav games. values_list will return specific value, in this case, using game instance from Favorite_game model
                        my_game_list = Favorite_game.objects.filter(user=request.user).values_list('game', flat=True) #flat=True will return single query
                        # print(my_game_list) This is returning queryset with only one value which is primary keys of fav games
                        games = Game.objects.filter(id__in=my_game_list).annotate(my_game_status=F('favorite_games__my_game_status'))
                        # annotate() allows to attach extra information to each item in the queryset. 
                        # F allows you to perform operations on the fields of a model instance without having to fetch the actual value from the database. 
                        fav_game_list = []
                        for game in games:
                            game_data = {
                                'api_id' : game.api_id,
                                'title' : game.title,
                                'thumbnail' : game.thumbnail,
                                'status' : game.status,
                                'short_description' : game.short_description,
                                'description' : game.description,
                                'game_url' : game.game_url,
                                'genre' : game.genre,
                                'platform' : game.platform,
                                'publisher' : game.publisher,
                                'developer' : game.developer,
                                'release_date' : game.release_date,
                                'freetogame_profile_url' : game.freetogame_profile_url,
                                'minimum_system_requirements' : game.minimum_system_requirements,
                                'screenshots' : game.screenshots,
                                'video_play_back' : game.video_play_back,
                                'my_game_status' : game.my_game_status,
                            }
                            fav_game_list.append(game_data)
                        return JsonResponse({'success': True, 'data': fav_game_list}, safe=False) 
                    except Exception as e:
                        print(e)
                        return JsonResponse({'success': False, 'message': str(e)})
                else:
                    return JsonResponse({'success': False, 'message': 'User not authenticated'})

            # sort and filter
            else:
                querystring = {} 
                # checks if the 'platform' query parameter is present in the GET request. If it exists, the code inside the if block is executed.
                if request.GET.get('platform'):
                    querystring['platform'] = request.GET['platform']
                    
                if request.GET.get('category'):
                    querystring['category'] = request.GET['category']

                if request.GET.get('sort_by'):
                    querystring['sort-by'] = request.GET['sort_by']

                # the requests library is used to make an HTTP GET request to the specified API endpoint and this method takes four arguments.'

                response = requests.request("GET", endpoint, headers=headers, params=querystring) #
                response_json = response.json() # Turn into Python dictionary
                return JsonResponse(response_json, safe=False)
            
        except Exception as e:
            return HttpResponse(str(e), status=500)
        
    def process_game_data(game_data):
        game, created = Game.objects.get_or_create(
            api_id=game_data["api_id"],
            defaults={
                "title": game_data["title"],
                "thumbnail": game_data["thumbnail"],
                "status": game_data["status"],
                "short_description": game_data["short_description"],
                "description": game_data["description"],
                "game_url": game_data["game_url"],
                "genre": game_data["genre"],
                "platform": game_data["platform"],
                "publisher": game_data["publisher"],
                "developer": game_data["developer"],
                "release_date": game_data["release_date"],
                "freetogame_profile_url": game_data["freetogame_profile_url"],
                "minimum_system_requirements": game_data["minimum_system_requirements"],
                "screenshots": game_data["screenshots"],
            }
        )
        print(game.api_id)
        return game
    
    # 
    if request.method == 'POST':
        try:
            # save game data to my database when user wants to add to favorite game library
            if request.user.is_authenticated:
                game_data = request.data # Deserialize the game data from the request body
                # print('game_data =====', game_data['search_value'])
                
                game_object = process_game_data(game_data)
                # print(game_object)
                
                my_game_status = game_data['my_game_status']  # or get the status from the request, e.g. request.POST['status']

                favorite, created = Favorite_game.objects.get_or_create(user=request.user, game=game_object)
                # if fav game already exist for that specific game, created will be set as True
                if not created: 
                    if favorite.my_game_status == my_game_status: # If the favorite status is same as previous, leave it as it is
                        return JsonResponse({'success': True, 'message': 'status unchanged.'})
                    else: # Or change the status
                        favorite.my_game_status = my_game_status
                        favorite.save()
                        return JsonResponse({'success': True, 'message': 'status updated.'})
                else: # If just created, then add status to the favorite game
                    favorite.my_game_status = my_game_status
                    favorite.save()
                    return JsonResponse({'success': True, 'message': 'status added.'})

                # return JsonResponse({'success': True})
            else:
                return JsonResponse({'success': False, 'message': 'User not authenticated'})
        except Exception as e:
            print(e)
            return JsonResponse({'success': False, 'message': str(e)})
    
    # delete functionality
    if request.method == 'PUT':
        try:
            if request.user.is_authenticated:
                python_dict = dict(request.data)
                dict_value = python_dict['api_id']
                game_id_found = Game.objects.filter(api_id = dict_value).values_list('id', flat=True)
                delete_game_from_my_list = Favorite_game.objects.filter(user=request.user, game_id = game_id_found[0])
                if delete_game_from_my_list:
                    delete_game_from_my_list.delete()
                    return JsonResponse({'success': True, 'message': 'succesfully deleted'})
                else:
                    return JsonResponse({'success': False, 'message': 'Game not found.'})
            else: 
                return JsonResponse({'success': False, 'message': 'User not authenticated'})
        except Exception as e:
            print(e)
            return JsonResponse({'success': False, 'message': str(e)})
        
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