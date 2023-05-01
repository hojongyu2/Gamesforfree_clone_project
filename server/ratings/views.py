from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from django.core import serializers
import json
# import model
from .models import Rating
# Create your views here.

api_view(['POST', 'GET'])
def handle_rating(request):
    if request.method == 'POST':
        jsons = json.loads(request.body)
        api_id = jsons['api_id']
        rating_choice = jsons['value']
        try:
            if request.user.is_authenticated: # check to see if user is sign_in
                # get_or_create Django method checks whether the instance of Rating model with the given 'user' and 'id' already exist or not.
                # If it does exist, then created will be set as FALSE. If the rating is just created, then created value will be set as TRUE
                # rating, created is a tuple of two value, First value is the object that was either retrieved or created,
                # and the second value is a boolean indicating whether the object was created or retreived.
                rating, created = Rating.objects.get_or_create(user=request.user, game_api_id=api_id)
                if not created: # If rating already exist,
                    if rating.value == rating_choice: # If the rating value is same as previous, DELETE
                        rating.delete()
                        return JsonResponse({'success': True, 'message': 'Rating undone/deleted.'})
                    else: # Or change the value
                        rating.value = rating_choice
                        rating.save()
                        return JsonResponse({'success': True, 'message': 'Rating updated.'})
                else: # If just created, then add value to the rating (Choices)
                    rating.value = rating_choice
                    rating.save()
                    return JsonResponse({'success': True, 'message': 'Rating added.'})
            else:
                return JsonResponse({'success': False, 'message': 'User not authenticated'})
        except Exception as e:
            print(e)
            return JsonResponse({'success': False, 'message': str(e)})

        
    if request.method == 'GET':
        api_id = request.GET.get('api_id') # get api_id from query string
        try:
            all_ratings_by_game_id = Rating.objects.filter(game_api_id=api_id)
            serialized_ratings = serializers.serialize('json', all_ratings_by_game_id) # serialize the queryset into JSON format before returning it in the JsonResponse.
            parsed_serialized_ratings = json.loads(serialized_ratings) # then deserialize the JSON string into Python objects so that It can be send over to the frontend
            fields_list = [rating['fields'] for rating in parsed_serialized_ratings] # create new list that containing only the 'fields' dictionaries
            return JsonResponse({'success': True, 'data': fields_list})
        except Exception as e:
            print(e)
            return JsonResponse({'success': False, 'message': str(e)})
    