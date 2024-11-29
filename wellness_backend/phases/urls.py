from django.urls import path
from .import views

urlpatterns = [
  path('userdetail/', views.UserDetailView.as_view(), name = 'user-detail'),
  path('profile/', views.UserProfileDetailView.as_view(), name='user-profile-detail'),
    
]