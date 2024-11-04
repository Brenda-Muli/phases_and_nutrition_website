from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from blogs.models import BlogPost
from blogs.serializers import BlogPostSerializer
from rest_framework import permissions


# Create your views here.

class BlogPostListView(ListAPIView):
  queryset = BlogPost.objects.order_by('-date_created')
  serializer_class = BlogPostSerializer
  lookup_field = 'slug'
  permission_classes = (permissions.AllowAny, )

class BlogPostDetailView(RetrieveAPIView):
  queryset = BlogPost.objects.order_by('-date_created')
  serializer_class = BlogPostSerializer
  lookup_field = 'slug'
  permission_classes = (permissions.AllowAny, )

class BlogFeaturedView(ListAPIView):
  queryset = BlogPost.objects.all().filter(featured=True)
  serializer_class = BlogPostSerializer
  lookup_field = 'slug'
  permission_classes = (permissions.AllowAny, )

class BlogPostCategoryView(APIView):
  serializer_class = BlogPostSerializer
  permission_classes = (permissions.AllowAny, )

  def post(self, request, format=None):
    data = self.request.data
    category = data['category']
    queryset = BlogPost.objects.order_by('-date_created').filter(category__iexact= category)

    serializer = BlogPostSerializer(queryset, many=True)

    return Response(serializer.data)
  
  def get(self, request, format=None):
        category = request.query_params.get('category')
        if not category:
            return Response({"error": "Category parameter is required."}, status=400)

        queryset = BlogPost.objects.order_by('-date_created').filter(category__iexact=category)

        serializer = BlogPostSerializer(queryset, many=True)

        return Response(serializer.data)


