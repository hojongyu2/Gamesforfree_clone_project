from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    email = models.EmailField(blank=False, null=False, unique=True)
    level = models.IntegerField(default=1)
    profile_pic = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    random_profile_pic = models.TextField(blank=True, null=True)
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return f'Email address : {self.email}'