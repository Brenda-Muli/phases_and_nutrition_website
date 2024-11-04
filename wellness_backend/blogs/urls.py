from django.urls import path
from blogs.views import BlogPostListView, BlogFeaturedView, BlogPostCategoryView, BlogPostDetailView

urlpatterns = [
    path('', BlogPostListView.as_view(), name='blog_post_list'), 
    path('featured/', BlogFeaturedView.as_view(), name='blog_featured'),
    path('category/', BlogPostCategoryView.as_view(), name='blog_post_category'),
    path('<slug>/', BlogPostDetailView.as_view(), name='blog_post_detail'), 
  

] 