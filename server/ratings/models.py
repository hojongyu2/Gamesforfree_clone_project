from django.db import models
from users.models import User
from games.models import Game

# Create your models here.

class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name="all_ratings")
    content = models.TextField()
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

    def __str__(self):
        return self.value