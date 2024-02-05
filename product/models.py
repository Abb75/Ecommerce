from datetime import datetime

from django.db import models
import datetime
# Create your models here.
from django.conf import settings
from django.db import models
from django.contrib.auth.models import User

from django.utils.text import slugify
from django.utils.timezone import now


class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name


class Products(models.Model):
    #user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    image = models.ImageField(upload_to="photo/")
    title = models.CharField(max_length=120, null=False)
    price = models.FloatField()
    slug = models.SlugField()
    description = models.TextField()
    stock = models.IntegerField(default=10)
    category = models.ForeignKey(Category, related_name="product", on_delete=models.CASCADE)
    createdAt = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.slug is not None:

            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    class Meta:

        verbose_name_plural = 'Products'
