from rest_framework import serializers
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from users.serializers import UserSerializer
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=False)

    class Meta:
        model = OrderItem
        fields = ['order', 'name', 'quantity', 'price', 'image']


class OrderUserSerializers(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)
    order_items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'totalPrice', 'createdAt', 'isPaid', 'isDelivered', 'paidAt', 'order_items']

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data
