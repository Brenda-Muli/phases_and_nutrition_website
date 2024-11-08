from django.shortcuts import render
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from .models import Phase, FoodCategory, Ingredient
from .serializers import PhaseSerializer, FoodCategorySerializer, IngredientSerializer
import os 

# Create your views here.

class IngredientList(generics.ListAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    permission_classes  = (permissions.AllowAny, )

    def get(self, request, *args, **kwargs):
        cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME')
        if not cloud_name:
            return Response ({"error": "Cloudinary cloud name is not set."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        ingredients = self.get_queryset()
        serializer = IngredientSerializer(ingredients, many=True)

        for ingredient in serializer.data:
            if 'image' in ingredient and ingredient['image']:
                ingredient['image'] = f"https://res.cloudinary.com/{cloud_name}/{ingredient['image']}"

        return Response(serializer.data, status = status.HTTP_200_OK)

class IngredientDetail(generics.RetrieveAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

    def get(self, request, *args, **kwargs):
        cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME')
        if not cloud_name:
            return Response ({"error": "Cloudinary cloud name is not set."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        ingredient = self.get_object()
        serializer = IngredientSerializer(ingredient)

        ingredient_data = serializer.data
        if 'image' in ingredient_data and ingredient_data['image']:
            ingredient_data['image'] = f"https://res.cloudinary.com/{cloud_name}/{ingredient_data['image']}"

        return Response(ingredient_data, status = status.HTTP_200_OK)


class FoodCategoryList(generics.ListAPIView):
    queryset = FoodCategory.objects.all()
    serializer_class = FoodCategorySerializer
    permission_classes = (permissions.AllowAny, )

    def get(self, request, *args, **kwargs):
        
        cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME')
        if not cloud_name:
            return Response({"error": "Cloudinary cloud name is not set."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
        food_categories = self.get_queryset()
        serializer = FoodCategorySerializer(food_categories, many=True)

       
        for food_category in serializer.data:
            if 'image' in food_category and food_category['image']:
                food_category['image'] = f"https://res.cloudinary.com/{cloud_name}/{food_category['image']}"

            
            if 'ingredients' in food_category:
                for ingredient in food_category['ingredients']:
                    if 'image' in ingredient and ingredient['image']:
                        ingredient['image'] = f"https://res.cloudinary.com/{cloud_name}/{ingredient['image']}"

        
        return Response(serializer.data, status=status.HTTP_200_OK)

        

class FoodCategoryDetail(generics.RetrieveAPIView):
    queryset = FoodCategory.objects.all()
    serializer_class = FoodCategorySerializer
    permission_classes = (permissions.AllowAny, )

    def get(self, request, *args, **kwargs):
        cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME')
        if not cloud_name:
            return Response({"error": "Cloudinary cloud name is not set. "},status=status.HTTP_500_INTERNAL_SERVER_ERROR )
        
        food_category = self.get_object()
        serializer = FoodCategorySerializer(food_category)

        food_category_data = serializer.data
        if 'image' in food_category_data and food_category_data['image']:
            food_category_data['image'] = f"https://res.cloudinary.com/{cloud_name}/{food_category_data['image']}"

        return Response(food_category_data, status=status.HTTP_200_OK)


class PhaseList(generics.ListAPIView):
    queryset = Phase.objects.all()
    serializer_class = PhaseSerializer
    permission_classes = (permissions.AllowAny, )

    def get(self, request, *args, **kwargs):
        response = super().get(request, *args, **kwargs)

        
        cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME')
        if not cloud_name:
            return Response({"error": "Cloudinary cloud name is not set."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
        phase_data = response.data

        
        for phase in phase_data:
            if 'food_categories' in phase:
                for category in phase['food_categories']:
                    if 'image' in category and category['image']:
                        category['image'] = f"https://res.cloudinary.com/{cloud_name}/{category['image']}"

            
                    if 'ingredients' in category:
                        for ingredient in category['ingredients']:
                            if 'image' in ingredient and ingredient['image']:
                                ingredient['image'] = f"https://res.cloudinary.com/{cloud_name}/{ingredient['image']}"

       
        return Response(phase_data, status=status.HTTP_200_OK)


class PhaseDetail(generics.RetrieveAPIView):
    queryset = Phase.objects.all()
    serializer_class = PhaseSerializer

    def get(self, request, *args, **kwargs):
        slug = kwargs.get('slug')
        print(f"Received slug: {slug}")

        
        phase = Phase.objects.filter(slug=slug).first()  
        if not phase:
            return Response({"error": "Phase not found."}, status=status.HTTP_404_NOT_FOUND)

        
        cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME')
        if not cloud_name:
            return Response({"error": "Cloudinary cloud name is not set."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        serializer =PhaseSerializer(phase)
        phase_data = serializer.data  

        
        if 'food_categories' in phase_data:
            for category in phase_data['food_categories']:
                if 'image' in category and category['image']:
                    category['image'] = f"https://res.cloudinary.com/{cloud_name}/{category['image']}"

               
                if 'ingredients' in category:
                    for ingredient in category['ingredients']:
                        if 'image' in ingredient and ingredient['image']:
                            ingredient['image'] = f"https://res.cloudinary.com/{cloud_name}/{ingredient['image']}"

      
        return Response(phase_data, status=status.HTTP_200_OK)


    