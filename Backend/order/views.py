from datetime import datetime

from django.shortcuts import render

# Create your views here.
from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Order, OrderItem
from .serializers import OrderUserSerializers, OrderItemSerializer
from product.models import Products


class OrderUserViewSet(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        data = request.data

        order_items = data['orderItems']
        if order_items and len(order_items) == 0:
            return Response({'detail': 'No Order Items'}, status.HTTP_400_BAD_REQUEST)

        else:

            order = Order.objects.create(

                user=user,
                totalPrice=data['totalPrice']

            )

            for item in order_items:
                product = Products.objects.get(id=item['product'])

                item = OrderItem.objects.create(
                    product=product,
                    order=order,
                    name=product.title,
                    quantity=item['quantity'],
                    price=item['price'],
                    image=item['image']

                )

                product.stock -= item.quantity

                product.save()

            serializer = OrderUserSerializers(order, many=False)

            return Response(serializer.data)


class GetAllOrderUser(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        order = Order.objects.filter(user=user)
        serializer = OrderUserSerializers(order, many=True)
        return Response(serializer.data)


class getOrderById(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        user = request.user

        try:
            order = Order.objects.get(id=pk)

            if user.is_staff or order.user == user:
                serializer = OrderUserSerializers(order, many=False)
                return Response(serializer.data)
            else:
                Response({'detail': 'Wrong'}, status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'detail': 'Order does not exist'})


class UpdateOrderToPaid(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        order = Order.objects.get(id=pk)
        order.isPaid = True
        order.paidAt = datetime.now()
        order.save()

        return Response('Order was paid')


