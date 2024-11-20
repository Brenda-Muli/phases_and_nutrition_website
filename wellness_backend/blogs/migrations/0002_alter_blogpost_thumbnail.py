# Generated by Django 5.1.1 on 2024-11-01 19:32

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blogs', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogpost',
            name='thumbnail',
            field=cloudinary.models.CloudinaryField(max_length=255, verbose_name='image'),
        ),
    ]