from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpRequest
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, JSONParser
from django.core.serializers import serialize
import json
from .models import *

# Create your views here.

@api_view(['POST', 'PUT', 'GET'])
# JSONParser will handle when JSON object data type is received.
# MultiPartParser will handle multipart/form-data request, such as file or mix of files. 
@parser_classes([MultiPartParser, JSONParser])
def auth_user(request):
    #only create a user if data from the client side has a key 'signup".
    if 'signup' in request.data and request.method == "POST":
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
    elif 'login' in request.data and request.method == "POST":
        email = request.data['email']
        password = request.data['password']
        current_user = authenticate(username = email, password=password) # If authenticated, this will return User Obj containing user information, otherwise, return none.

        # only authenticate if the current user is active and exist
        if current_user and current_user.is_active == True:
            try:
                #django login function sets a session cookie in the browser containing an encrypted session ID(using user ID)
                login(request._request, current_user) 
                return JsonResponse({'success': True})
            except Exception as e:
                print(e)
                return JsonResponse({'success': False})
        return JsonResponse({'success': False})
    
    elif 'logout' in request.data and request.method == 'PUT':
        try:
            # when logout is called, it will clears the user's session data so it prevent other user's to access previous user's session data.
            logout(request)
            return JsonResponse({'success': True})
        except Exception as e:
            print(e)
            return JsonResponse({'success': False})
        
    elif request.method == 'GET':
        if request.user.is_authenticated:
            # print(request.user)
            # serializer will convert complex data into python Objects so that it can be easily stored as machine/human readable format.
            user_info = serialize("json",  [request.user], fields = ['name', 'email'])
            parsed_user_info = json.loads(user_info) # parse a JSON string data
            return JsonResponse(parsed_user_info[0]['fields']) # return user email

        return JsonResponse({'success': False, 'user':None})
