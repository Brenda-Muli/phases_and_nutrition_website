from django.urls import path
from .import views

urlpatterns = [
  path('userdetail/', views.UserDetailView.as_view(), name = 'user-detail'),

  path('profile/update/', views.update_user_profile, name='profile-update'),

  path('profile/', views.UserProfileDetailView.as_view(), name='user-profile-detail'),

  path('profile/add-ingredient/', views.add_ingredient_to_profile, 
  name='add-ingredient'),

  path('profile/remove-ingredient/', views.remove_ingredient_from_profile, name='remove-ingredient'),
    
]