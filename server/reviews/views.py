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
            if request.user.is_authenticated:
                new_review = Review.objects.create(user=request.user, game_api_id=api_id, content=user_review)
                new_review.save()
                return JsonResponse({'success': True})
            else:
                return JsonResponse({'success': False, 'message': 'User not authenticated'})
        except Exception as e:
            print(e)
            return JsonResponse({'success': False, 'message': str(e)})
    
    if request.method == 'GET':
        api_id = request.GET.get('api_id')
        try:
            all_reviews = Review.objects.filter(game_api_id=api_id)
            serialized_reviews = serializers.serialize('json', all_reviews)
            parsed_serialized_reviews = json.loads(serialized_reviews)
            # print(parsed_serialized_reviews[0]['fields'])
            return JsonResponse({'success': True, 'data': parsed_serialized_reviews[0]['fields']})
        except Exception as e:
            print(e)
            return JsonResponse({'success': False, 'message': str(e)})

