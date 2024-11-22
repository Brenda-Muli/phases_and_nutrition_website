from django.urls import path
from . import views

urlpatterns = [
  path('current_phase/', views.currentPhaseView.as_view(), name = 'current_phase')
]

