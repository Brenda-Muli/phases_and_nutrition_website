from django.contrib import admin
from .models import Ingredient, FoodCategory, Phase, PhaseFoodCategoryIngredient

# Register your models here.
admin.site.register(Ingredient)
admin.site.register(FoodCategory)
admin.site.register(Phase)
admin.site.register(PhaseFoodCategoryIngredient)