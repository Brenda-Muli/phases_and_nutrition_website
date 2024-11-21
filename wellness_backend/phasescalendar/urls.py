from django.urls import path
from . import views

urlpatterns = [
  path('current_phase/', views.currentPhaseView.as_view(), name = 'cuurent_phase'),
  path('posted_data/', views.PostMenstrualCycleView.as_view(), name = 'menstrual_cycle')
]

