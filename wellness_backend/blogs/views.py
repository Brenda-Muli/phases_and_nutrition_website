from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from blogs.models import BlogPost
from blogs.serializers import BlogPostSerializer
from rest_framework import permissions
import os 


# Create your views here.

class BlogPostListView(ListAPIView):
  queryset = BlogPost.objects.order_by('-date_created')
  serializer_class = BlogPostSerializer
  lookup_field = 'slug'
  permission_classes = (permissions.AllowAny, )


  def get(self, request, *args, **kwargs):
     cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME')

     if not cloud_name:
        return Response({"error": "Cloudinary cloud name is not set. "},status=status.HTTP_500_INTERNAL_SERVER_ERROR )
     
     blog_posts = BlogPost.objects.order_by('-date_created')
     serializer = BlogPostSerializer(blog_posts, many = True)

     for blog in serializer.data:
        if 'thumbnail' in blog and blog['thumbnail']:
            blog['thumbnail'] = f"https://res.cloudinary.com/{cloud_name}/{blog['thumbnail']}"
     return Response(serializer.data, status=status.HTTP_200_OK)

           
class BlogPostDetailView(RetrieveAPIView):
  queryset = BlogPost.objects.order_by('-date_created')
  serializer_class = BlogPostSerializer
  lookup_field = 'slug'
  permission_classes = (permissions.AllowAny, )

  def get(self, request, *args, **kwargs):
     cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME")

     if not cloud_name:
        return Response ({"error": "Cloudinary cloud name is not set. "},status=status.HTTP_500_INTERNAL_SERVER_ERROR )

     blog_post = self.get_object() 
     blog_post_data = BlogPostSerializer(blog_post).data

     if 'thumbnail' in blog_post_data and blog_post_data['thumbnail']:
            blog_post_data['thumbnail'] = f"https://res.cloudinary.com/{cloud_name}/{blog_post_data['thumbnail']}"
     
     return Response(blog_post_data,status=status.HTTP_200_OK)

     
class BlogFeaturedView(ListAPIView):
    queryset = BlogPost.objects.filter(featured=True).order_by('-date_created') 
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'
    permission_classes = (permissions.AllowAny, )

    def get(self, request, *args, **kwargs):
        cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME')
        if not cloud_name:
            return Response({"error": "Cloudinary cloud name is not set."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
        queryset = BlogPost.objects.filter(featured=True).order_by('-date_created')  
        serializer = BlogPostSerializer(queryset, many=True)

        for blog in serializer.data:
            if 'thumbnail' in blog and blog['thumbnail']:
                blog['thumbnail'] = f"https://res.cloudinary.com/{cloud_name}/{blog['thumbnail']}"

        if not serializer.data:
            return Response({"message": "No featured posts available."}, status=status.HTTP_404_NOT_FOUND)

        return Response(serializer.data, status=status.HTTP_200_OK)



class BlogPostCategoryView(APIView):
  serializer_class = BlogPostSerializer
  permission_classes = (permissions.AllowAny, )

  
  def get(self, request, format=None):
        category = request.query_params.get('category')
        if not category:
            return Response({"error": "Category parameter is required."}, status=400)

        queryset = BlogPost.objects.order_by('-date_created').filter(category__iexact=category)

        serializer = BlogPostSerializer(queryset, many=True)

        cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME')
        if not cloud_name:
          return Response({"error": "Cloudinary cloud name is not set."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        for blog in serializer.data:
           if 'thumbnail' in blog and blog['thumbnail']:
              blog['thumbnail'] = f"https://res.cloudinary.com/{cloud_name}/{blog['thumbnail']}"

        return Response(serializer.data, status=status.HTTP_200_OK)


