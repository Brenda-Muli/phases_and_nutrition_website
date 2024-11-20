from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField
from django.db.models.signals import post_save
from django.dispatch import receiver


# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, null=True, blank=True)
    profile_picture = CloudinaryField('profile_picture', null=True, blank=True)
    saved_ingredients = models.ManyToManyField('meal.Ingredient', related_name='saved_by', blank=True)

    def __str__(self):
        return self.user.username


