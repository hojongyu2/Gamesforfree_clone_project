from django.db import models
from users.models import User

# Create your models here.
# Probably won't need this
class Game(models.Model):
    api_id = models.IntegerField(unique=True, default=0)
    title = models.CharField(max_length=255)
    thumbnail = models.URLField(null=True, blank=True)
    status = models.CharField(max_length=255)
    short_description = models.TextField()
    description = models.TextField()
    game_url = models.URLField()
    genre = models.CharField(max_length=50)
    platform = models.CharField(max_length=50)
    publisher = models.CharField(max_length=255)
    developer = models.CharField(max_length=255)
    release_Date = models.CharField(max_length=255)
    freetogame_profile_url = models.URLField()
    minumum_system_requirements = models.JSONField(null=True, blank=True)
    screenshots = models.JSONField(null=True, blank=True)
    video_play_back = models.URLField(null=True, blank=True)
    
    def __str__(self):
        return self.title
    
class Favorite_game(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="favorite_games", default = 1)
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name="favorite_games", default = 1)
    ## a user can have many favorite_games, but each favorite_game belongs to only one user. One to many relation ships
    ## sames goes for game. Each Game can be added to multiple Favorite_game records, and each Favorite_game record belongs to only one Game.
    STATUS_CHOICES = (
        ('played', 'Played'),
        ('play_later', 'play later'),
        ('currently_playing', 'Currently playing'),
    )
    status = models.CharField(max_length=50, choices=STATUS_CHOICES)

    def get_all_favorite_games(self):
        return Favorite_game.objects.all()

    def __str__(self):
        return self.game.title