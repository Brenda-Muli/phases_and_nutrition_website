from django.contrib import admin
from django_summernote.admin import SummernoteModelAdmin
from .models import BlogPost

# Register your models here.
class BlogPostAdmin(SummernoteModelAdmin):
  exclude = ('slug', )
  list_display = ('id', 'title', 'category', 'date_created', 'thumbnail')
  list_display_links = ('id', 'title')
  search_fields = ('title', )
  list_per_page = 15
  summernote_fields = ('content',)


admin.site.register(BlogPost, BlogPostAdmin)