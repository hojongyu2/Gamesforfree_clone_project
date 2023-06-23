from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpRequest
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, JSONParser
from django.core.serializers import serialize
import json
import requests
import random
# .env
import os
from dotenv import load_dotenv
load_dotenv()
from django.middleware.csrf import get_token
from .models import * # import model

# Create your views here.
@api_view(['POST', 'PUT', 'GET'])
# JSONParser will handle when JSON object data type is received.
# MultiPartParser will handle multipart/form-data request, such as file or mix of files. 
@parser_classes([MultiPartParser, JSONParser])
def auth_user(request):
    if request.method == "POST":
        #only create a user if data from the client side has a key 'signup".
        if 'signup' in request.data:
            print(request.data)
            email = request.data['email']
            password = request.data['password']
            first_name = request.data['first_name']
            last_name = request.data['last_name']
            profile_pic = request.FILES.get('profile_pic', None) ## allowes to get file like data and if not present, then set it as none.
            # profile_pic = request.data['profile_pic']
            try:
                new_user = User.objects.create_user(username = email, email=email, first_name=first_name, last_name=last_name, password=password, profile_pic=profile_pic)
                new_user.save()
                return JsonResponse({'success': True})
            except Exception as e:
                print('this is error message: ', e)
                return JsonResponse({'success': False, 'message': str(e)})
            
        #only user to log in if received data from the client side has a key 'login'.
        elif 'login' in request.data:
            email = request.data['email']
            password = request.data['password']
            current_user = authenticate(username=email, password=password)

            if current_user is not None and current_user.is_active:
                # User is authenticated and active
                try:
                    print(current_user.profile_pic.url if current_user.profile_pic else "No profile pic")
                    login(request, current_user)
                    print("CSRF Token from request when login:", get_token(request))

                    if not current_user.random_profile_pic:
                        # Fetch a random picture if user's random_profile_pic is empty
                        url = "https://pexelsdimasv1.p.rapidapi.com/v1/search"
                        querystring = {"query":"profile picture","locale":"en-US","per_page":"50","page":"1"}
                        headers = {
                            "content-type": "application/octet-stream",
                            "Authorization": os.getenv("AUTHORIZATION_TOKEN"),
                            "X-RapidAPI-Key": os.getenv("PEXELS_RAPIDAPI_KEY"),
                            "X-RapidAPI-Host": os.getenv("RAPIDAPI_HOST"),
                        }
                        response = requests.get(url, headers=headers, params=querystring)
                        json_data = response.json()
                        photos = json_data.get('photos', []) 
                        original_urls = [photo['src']['original'] for photo in photos]
                        
                        random_picture = random.choice(original_urls)
                        current_user.random_profile_pic = random_picture
                        current_user.save()
                        profile_pic = None
                    else:
                        profile_pic = current_user.profile_pic.url if current_user.profile_pic else None

                    response_data = {
                        'email': current_user.email,
                        'level': current_user.level,
                        'profile_pic': profile_pic,
                        'random_profile_pic': current_user.random_profile_pic
                    }
                    return JsonResponse({'success': True, 'user': response_data})
                except Exception as e:
                    print(e)
                    return JsonResponse({'success': False, 'message' : str(e)})

            else:
                # User is not authenticated or is inactive
                return JsonResponse({'success': False})

    elif request.method == 'PUT':
        if 'logout' in request.data:
            try:
                # print('_auth_user_id' in request.session)
                # when logout is called, it will clears the user's session data so it prevent other user's to access previous user's session data.
                logout(request)
                print("CSRF Token from request when signout:", get_token(request))
                if '_auth_user_id' not in request.session: #To check if the session has been cleared
                    return JsonResponse({'success': True})
                else:
                    return JsonResponse({'success': False})
            except Exception as e:
                print(e)
                return JsonResponse({'success': False, 'message': 'An error occurred while logging out'})
        
    elif request.method == 'GET':
        if request.user.is_authenticated:
            # print(request.user)
            # serializer will convert complex data into python Objects so that it can be easily stored as machine/human readable format.
            user_info = serialize("json",  [request.user], fields = ['name', 'email', 'random_profile_pic'])
            parsed_user_info = json.loads(user_info) # parse a JSON string data
            username = parsed_user_info[0]['fields']
            random_profile_pic = parsed_user_info[0]['fields'].get('random_profile_pic', None)
            # print(parsed_user_info[0]['fields'])
            return JsonResponse({'success': True, 'user': username, 'random_profile_pic': random_profile_pic}) # return user email

        return JsonResponse({'success': False, 'user':None})
