from django.urls import path, include
from rest_framework import views
from rest_framework.routers import DefaultRouter
from .views import ListProductViewSet, ListImagesProductViewSet


router = DefaultRouter()
router.register(r'product', ListProductViewSet, 'product')
router.register(r'product/images', ListImagesProductViewSet, 'product-images')

app_name = 'product'

urlpatterns = [
    path('', include(router.urls)),
]