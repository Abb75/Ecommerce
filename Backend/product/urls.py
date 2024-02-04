from django.urls import path, include
from rest_framework import views
from rest_framework.routers import DefaultRouter
from .views import ListProductViewSet


router = DefaultRouter()
router.register(r'product', ListProductViewSet, 'product')

app_name = 'product'

urlpatterns = [
    path('', include(router.urls)),
]