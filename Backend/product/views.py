from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie
from rest_framework import viewsets
from django.http import JsonResponse

from .serializers import ListProduct, ListImageProductSerializer
from .models import Products
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny, IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser


class ListProductViewSet(viewsets.ModelViewSet):
    serializer_class = ListProduct

    queryset = Products.objects.order_by('-price')
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [AllowAny]


class ListImagesProductViewSet(viewsets.ModelViewSet):
    serializer_class = ListImageProductSerializer
    queryset = Products.objects.exclude(image__isnull=True)

    def list(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.queryset, many=True)
        return JsonResponse(serializer.data, safe=False)