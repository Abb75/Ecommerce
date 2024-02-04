from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie
from rest_framework import viewsets

from .serializers import ListProduct
from .models import Products
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny, IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser


class ListProductViewSet(viewsets.ModelViewSet):
    serializer_class = ListProduct

    queryset = Products.objects.order_by('-price')
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [AllowAny]
