from django.db import models
from cloudinary.models import CloudinaryField 
from django.utils.text import slugify

# Create your models here.
class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    image = CloudinaryField('image') 
    slug = models.SlugField(unique=True, blank = True)

    def __str__(self):
        return self.name

class FoodCategory(models.Model):
    name = models.CharField(max_length=100)
    image = CloudinaryField('image')  
    

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

class PhaseFoodCategoryIngredient(models.Model):
    phase = models.ForeignKey(Phase, on_delete=models.CASCADE)
    food_category = models.ForeignKey(FoodCategory, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('phase', 'food_category', 'ingredient')

    def __str__(self):
        return f'{self.phase.name} - {self.food_category.name } - {self.ingredient.name}' 
