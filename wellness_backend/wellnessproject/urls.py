"""
URL configuration for wellnessproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from phases.views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),
    path ("api/", include("phases.urls")),
    path ('api-auth/', include('rest_framework.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path ('api/user/register/', UserCreate.as_view(), name='user_create'),
    path ('api/user/login/', UserCreate.as_view(), name='user_create'),
    path('accounts/', include('allauth.urls')),
    path ('callback/', google_login_callback, name='callback'),
    path('api/auth/user/', UserDetailView.as_view(), name='user_detail'),
    path('api/google/validate_token/', validate_google_token, name='validate_token'),
    path('summernote/', include('django_summernote.urls')), 
    path('api/blog/', include('blogs.urls')),
    path('api/meal/', include('meal.urls')),
    path('api/phases/', include('phases.urls')),
    path('api/calendar/', include("phasescalendar.urls"))
    
]  


