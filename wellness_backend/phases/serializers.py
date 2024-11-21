from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile
from meal.models import Ingredient 
import os

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id','email','username','password')
    extra_kwargs = {
      'password' : {'write_only' : True},
      'email': {'required': True}}

  def create(self,validated_data):
    user = User.objects.create_user(
      username=validated_data['username'],
      email=validated_data['email'],
      password=validated_data['password'] 
    )
    return user
  

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    saved_ingredients = serializers.PrimaryKeyRelatedField(queryset=Ingredient.objects.all(), many=True)

    class Meta:
        model = UserProfile
        fields = ['user', 'bio', 'profile_picture', 'saved_ingredients']

    def to_representation(self, instance):
      data = super().to_representation(instance)
      cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME")

      if cloud_name:
          if 'profile_picture' in data and data['profile_picture']:
              data['profile_picture'] = f"https://res.cloudinary.com/{cloud_name}/{data['profile_picture']}"
          if 'saved_ingredients' in data and data['saved_ingredients']:
              ingredient_ids = data['saved_ingredients']
              ingredients = Ingredient.objects.filter(id__in=ingredient_ids)
              for ingredient in ingredients:
                  if ingredient.image:
                      ingredient.image = f"https://res.cloudinary.com/{cloud_name}/{ingredient.image}"
              data['saved_ingredients'] = [
                  {
                      'id': ingredient.id,
                      'name': ingredient.name,
                      'image': ingredient.image if ingredient.image else None
                  }
                  for ingredient in ingredients
              ]

      return data


    
