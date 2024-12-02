from django.urls import path
from .import views
from allauth.socialaccount.providers.google.views import OAuth2LoginView
from django.urls import path

urlpatterns = [
  path('userdetail/', views.UserDetailView.as_view(), name = 'user-detail'),
  path('profile/', views.UserProfileDetailView.as_view(), name='user-profile-detail'),
  path('accounts/google/login/', OAuth2LoginView.as_view(), name='google_login'),
    
]