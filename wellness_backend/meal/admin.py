from django.contrib import admin
from .models import Ingredient, FoodCategory, Phase

# Register your models here.
admin.site.register(Ingredient)
admin.site.register(FoodCategory)
admin.site.register(Phase)