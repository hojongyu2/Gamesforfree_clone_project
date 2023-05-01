from django.http import JsonResponse
from rest_framework.decorators import api_view
import json
# import model
from .models import Review
# Create your views here.

api_view(['POST', 'GET'])
def handle_review(request):
    if request.method == 'POST':
        jsons = json.loads(request.body)
        api_id = jsons['api_id']
        user_review = jsons['user_review']
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
            fields_list = []
            for review in all_reviews_by_game_id: # custom serialization function 
                fields_list.append({
                    'username': review.user.username,
                    'random_profile_pic': review.user.random_profile_pic,
                    'game_api_id': review.game_api_id,
                    'content': review.content,
                    'created_at': review.created_at,
                    'updated_at': review.updated_at
                })
            return JsonResponse({'success': True, 'data': fields_list})
        except Exception as e:
            print(e)
            return JsonResponse({'success': False, 'message': str(e)})

