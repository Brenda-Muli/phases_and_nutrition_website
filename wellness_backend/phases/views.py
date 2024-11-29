from django.shortcuts import redirect
from django.contrib.auth.models import User
from .models import UserProfile
from rest_framework.response import Response
from meal.serializers import IngredientSerializer
from rest_framework.views import APIView
from meal.models import Ingredient
from rest_framework import generics
from .serializers import UserSerializer, UserProfileSerializer
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.dispatch import receiver
from django.db.models.signals import post_save
from allauth.socialaccount.models import SocialToken, SocialAccount
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated
import json
import os


# Create your views here.

class UserCreate(generics.CreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [AllowAny]

  def perform_create(self, serializer):
    user = serializer.save()
    UserProfile.objects.create(user = user)

    return user

class UserDetailView(generics.RetrieveUpdateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [IsAuthenticated]

  def get_object(self):
    try:
      profile = self.request.user.profile
      return profile
    except UserProfile.DoesNotExist:
       profile = UserProfile.objects.create(user = self.request.user)

       return profile
  
@csrf_exempt
def google_login_callback(request):
  user = request.user

  social_accounts = SocialAccount.objects.filter(user=user)
  print('Social Account for user:', social_accounts)

  social_account = social_accounts.first()

  if not social_account:
    print('No social account for user:', user)
    return redirect ('http://localhost:5173/login/callback/?error=NoSocialAccount')
  
  token = SocialToken.objects.filter(account= social_account, account__provider='google').first()

  if token:
    print('Google token found:', token.token)
    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)
    return redirect (f'http://localhost:5173/login/callback/?access_token={access_token}')
  
  else:
    print('No Google token found for user', user)
    return redirect (f'http://localhost:5173/login/callback/?error=NoGoogleToken')

@csrf_exempt
def validate_google_token(request):
  if request.method == 'POST':
    try:
      data = json.loads(request.body)
      google_access_token = data.get('access_token')
      print(google_access_token)

      if not google_access_token:
        return JsonResponse ({'detail': 'Access Token is missing.'}, status = 400)
      return JsonResponse ({'valid': True})
    except json.JSONDecodeError:
      return JsonResponse ({'detial': 'Invalid JSON.'}, status=400)
  return JsonResponse({'valid' : 'Method not allowed'}, status=405)

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

class UserProfileDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Retrieve or create the user's profile
        try:
            profile = self.request.user.profile
            return profile
        except UserProfile.DoesNotExist:
            profile = UserProfile.objects.create(user=self.request.user)
            return profile

    def get(self, request, *args, **kwargs):
        # Get the user's profile data
        user_profile = self.get_object()
        profile_data = UserProfileSerializer(user_profile).data
        
        # Cloudinary base URL
        cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME') 
        if not cloud_name:
            return Response({"error": "Cloudinary cloud name is not set."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Prepend Cloudinary base URL to profile picture
        if 'profile_picture' in profile_data and profile_data['profile_picture']:
        # Only prepend the base URL if the profile picture doesn't already have it
          if not profile_data['profile_picture'].startswith('https://res.cloudinary.com'):
            profile_data['profile_picture'] = f"https://res.cloudinary.com/{cloud_name}/{profile_data['profile_picture']}"


        # Include the user's saved ingredients
        saved_ingredients = user_profile.saved_ingredients.all()
        ingredients_data = IngredientSerializer(saved_ingredients, many=True).data

        # Add Cloudinary base URL to the ingredient images
        for ingredient in ingredients_data:
            if 'image' in ingredient and ingredient['image']:
                ingredient['image'] = f"https://res.cloudinary.com/{cloud_name}/{ingredient['image']}"

        # Combine profile and ingredients data
        response_data = {
            "profile": profile_data,
            "saved_ingredients": ingredients_data,
        }
        return Response(response_data, status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        # Update the user's profile
        user_profile = self.get_object()
        serializer = UserProfileSerializer(user_profile, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()

            # Update the profile picture if provided
            if 'profile_picture' in request.data:
                user_profile.profile_picture = request.data['profile_picture']
                user_profile.save()

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        # Add an ingredient to the user's profile
        ingredient_id = request.data.get('ingredient_id')
        if not ingredient_id:
            return JsonResponse({"error": "Ingredient ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            ingredient = Ingredient.objects.get(id=ingredient_id)
        except Ingredient.DoesNotExist:
            return JsonResponse({"error": "Ingredient not found."}, status=status.HTTP_404_NOT_FOUND)

        user_profile = self.get_object()
        if ingredient not in user_profile.saved_ingredients.all():
            user_profile.saved_ingredients.add(ingredient)
            return JsonResponse({"message": f"Ingredient '{ingredient.name}' added to your profile."}, status=status.HTTP_200_OK)

        return JsonResponse({"message": "Ingredient is already in your profile."}, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        # Remove an ingredient from the user's profile
        ingredient_id = request.data.get('ingredient_id')
        if not ingredient_id:
            return JsonResponse({"error": "Ingredient ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            ingredient = Ingredient.objects.get(id=ingredient_id)
        except Ingredient.DoesNotExist:
            return JsonResponse({"error": "Ingredient not found."}, status=status.HTTP_404_NOT_FOUND)

        user_profile = self.get_object()
        if ingredient in user_profile.saved_ingredients.all():
            user_profile.saved_ingredients.remove(ingredient)
            return JsonResponse({"message": f"Ingredient '{ingredient.name}' removed from your profile."}, status=status.HTTP_200_OK)

