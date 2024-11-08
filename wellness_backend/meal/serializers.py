from rest_framework import serializers
from .models import Ingredient, FoodCategory, Phase

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'image', 'description']  

class FoodCategorySerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True, read_only=True)
    class Meta:
        model = FoodCategory
        fields = ['id', 'name', 'image', 'ingredients']

class PhaseSerializer(serializers.ModelSerializer):
    food_categories = FoodCategorySerializer(many=True, read_only=True)
    class Meta:
        model = Phase
        fields = ['id', 'name', 'slug','food_categories']
