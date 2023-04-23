from django.db import models
from users.models import User
from games.models import Game

# Create your models here.
class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_reviews", default=1)
    game_api_id = models.IntegerField(default=0)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    
    # def get_total_number_of_reviews(self):
    #     return
    
    # def edit(self):
    #     return
    
    def __str__(self):
        return f"user : {self.user}, content : {self.content}"