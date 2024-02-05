from rest_framework import serializers
from .models import Products


class ListProduct(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    class Meta:
        model = Products
        fields = ['id', 'slug','image', 'title', 'price', 'category', 'description', 'stock']
