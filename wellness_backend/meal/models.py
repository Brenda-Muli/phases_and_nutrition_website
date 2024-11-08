from django.db import models
from cloudinary.models import CloudinaryField 
from django.utils.text import slugify

# Create your models here.
class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    image = CloudinaryField('image') 
    description = models.TextField(blank=True)
    slug = models.SlugField(unique=True, blank = True)

    def __str__(self):
        return self.name

class FoodCategory(models.Model):
    name = models.CharField(max_length=100)
    image = CloudinaryField('image')  
    ingredients = models.ManyToManyField(Ingredient, related_name='categories')

    def __str__(self):
        return self.name

class Phase(models.Model):
    name = models.CharField(max_length=100)
    food_categories = models.ManyToManyField(FoodCategory, related_name='phases')
    slug = models.SlugField(unique=True, blank = True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


    def __str__(self):
        return self.name
