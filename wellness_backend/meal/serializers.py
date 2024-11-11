from rest_framework import serializers
from .models import Ingredient, FoodCategory, Phase, PhaseFoodCategoryIngredient

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'image']  

class FoodCategorySerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True, read_only=True)

    class Meta:
        model = FoodCategory
        fields = ['id', 'name', 'image', 'ingredients']

    def get_ingredients(self, obj):
        phase = self.context.get('phase')  
        if not phase:
            return []

        phase_food_category_ingredients = PhaseFoodCategoryIngredient.objects.filter(
            phase=phase,  
            food_category = obj 
        )

        ingredients = []
        for pfc_ingredient in phase_food_category_ingredients:
            ingredient_data = {
                'ingredient': IngredientSerializer(pfc_ingredient.ingredient).data,
            }
            ingredients.append(ingredient_data)

        return ingredients



class PhaseSerializer(serializers.ModelSerializer):
    food_categories = FoodCategorySerializer(many=True, read_only=True)

    class Meta:
        model = Phase
        fields = ['id', 'name', 'slug', 'food_categories']


