from django.contrib import admin
from .models import Game, Favorite_game
# Register your models here.

admin.site.register([Game, Favorite_game])