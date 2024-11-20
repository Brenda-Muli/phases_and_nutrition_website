from django.shortcuts import redirect
from django.contrib.auth.models import User
from .models import UserProfile
from rest_framework.response import Response
import os
from meal.models import Ingredient
from rest_framework.decorators import api_view, permission_classes
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
from rest_framework.generics import RetrieveUpdateAPIView
import json


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

class UserProfileDetailView(RetrieveUpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
      try:
          profile = self.request.user.profile
          return profile
      except UserProfile.DoesNotExist:
          profile = UserProfile.objects.create(user=self.request.user)
          return profile

    def get(self, request, *args, **kwargs):
        user_profile = self.get_object()
        user_profile_data = UserProfileSerializer(user_profile).data

        
        return Response(user_profile_data, status=status.HTTP_200_OK)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    user_profile = UserProfile.objects.get(user=request.user)  
    serializer = UserProfileSerializer(user_profile, data=request.data, partial=True)

    # Check if the data is valid
    if serializer.is_valid():
        serializer.save()

        if 'profile_picture' in request.data:
              profile_picture = request.data['profile_picture']
              user_profile.profile_picture = profile_picture
              user_profile.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])  
def add_ingredient_to_profile(request):
    ingredient_id = request.data.get('ingredient_id')
    if not ingredient_id:
        return JsonResponse({"error": "Ingredient ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        ingredient = Ingredient.objects.get(id=ingredient_id)
    except Ingredient.DoesNotExist:
        return JsonResponse({"error": "Ingredient not found."}, status=status.HTTP_404_NOT_FOUND)
    user_profile, created = UserProfile.objects.get_or_create(user=request.user)

    # If ingredient is not already saved, add it to the profile's saved_ingredients list
    if ingredient not in user_profile.saved_ingredients.all():
        user_profile.saved_ingredients.add(ingredient)
        return JsonResponse({"message": f"Ingredient '{ingredient.name}' added to your profile."}, status=status.HTTP_200_OK)
    
    return JsonResponse({"message": "Ingredient is already in your profile."}, status=status.HTTP_200_OK)


# Remove ingredient from profile
@api_view(['POST'])
@permission_classes([IsAuthenticated])  
def remove_ingredient_from_profile(request):
    ingredient_id = request.data.get('ingredient_id')
    if not ingredient_id:
        return JsonResponse({"error": "Ingredient ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        ingredient = Ingredient.objects.get(id=ingredient_id)
    except Ingredient.DoesNotExist:
        return JsonResponse({"error": "Ingredient not found."}, status=status.HTTP_404_NOT_FOUND)

    # Retrieve the user's profile
    user_profile = UserProfile.objects.get(user=request.user)

    # If ingredient is in the profile's saved_ingredients, remove it
    if ingredient in user_profile.saved_ingredients.all():
        user_profile.saved_ingredients.remove(ingredient)
        return JsonResponse({"message": f"Ingredient '{ingredient.name}' removed from your profile."}, status=status.HTTP_200_OK)

    return JsonResponse({"message": "Ingredient not found in your profile."}, status=status.HTTP_404_NOT_FOUND)