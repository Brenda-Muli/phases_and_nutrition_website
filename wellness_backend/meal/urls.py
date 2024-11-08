from django.urls import path
from .views import ( IngredientList, IngredientDetail,
    FoodCategoryList, FoodCategoryDetail,
    PhaseList, PhaseDetail)

urlpatterns = [
    path('ingredients/', IngredientList.as_view(), name='ingredient-list'),
    path('ingredients/<int:pk>/', IngredientDetail.as_view(), name='ingredient-detail'),
    path('food_categories/', FoodCategoryList.as_view(), name='food-category-list'),
    path('food_categories/<int:pk>/', FoodCategoryDetail.as_view(), name='food-category-detail'),
    path('phases/', PhaseList.as_view(), name='phase-list'),
    path('phases/<slug:slug>/', PhaseDetail.as_view(), name='phase-detail'),
]
