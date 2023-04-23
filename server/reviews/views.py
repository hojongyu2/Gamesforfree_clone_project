from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
import json
from django.core import serializers
# import model
from .models import Review
# Create your views here.

api_view(['POST', 'GET'])
def handle_review(request):
    if request.method == 'POST':
        api_id = request.POST['api_id']
        user_review = request.POST['user_review']
        try:
            if request.user.is_authenticated: # check to see if user is sign_in
                new_review = Review.objects.create(user=request.user, game_api_id=api_id, content=user_review)
                new_review.save()
                return JsonResponse({'success': True})
            else:
                return JsonResponse({'success': False, 'message': 'User not authenticated'})
        except Exception as e:
            print(e)
            return JsonResponse({'success': False, 'message': str(e)})
    
    if request.method == 'GET':
        api_id = request.GET.get('api_id') # get api_id from query string
        try:
            all_reviews_by_game_id = Review.objects.filter(game_api_id=api_id)
            serialized_reviews = serializers.serialize('json', all_reviews_by_game_id) # serialize the queryset into JSON format before returning it in the JsonResponse.
            parsed_serialized_reviews = json.loads(serialized_reviews) # then deserialize the JSON string into Python objects so that It can be send over to the frontend
            fields_list = [review['fields'] for review in parsed_serialized_reviews] # create new list that containing only the 'fields' dictionaries
            return JsonResponse({'success': True, 'data': fields_list})
        except Exception as e:
            print(e)
            return JsonResponse({'success': False, 'message': str(e)})

