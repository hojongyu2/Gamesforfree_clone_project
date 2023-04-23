from django.db import models
from users.models import User
from games.models import Game

# Create your models here.

class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    game_api_id = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    
    LIKE = 'like'
    NEUTRAL = 'neutral'
    DISLIKE = 'dislike'

    RATING_CHOICES = (
        (LIKE, 'Like'),
        (NEUTRAL, 'Neutral'),
        (DISLIKE, 'Dislike'),
    )
    
    value = models.CharField(max_length=10, choices=RATING_CHOICES)
    
    ## unique constraint to prevent a user from making multiple ratings for a single game
    ## This will raise an error If a user trying to leave more than one rating for a same game
    class Meta:
        unique_together = ('user', 'game_api_id')
        
    def __str__(self):
        return self.value