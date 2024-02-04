from django.urls import path
from .views import OrderUserViewSet, UpdateOrderToPaid, getOrderById, GetAllOrderUser

app_name = 'order'

urlpatterns = [


    path('add/', OrderUserViewSet.as_view(), name='order_add'),
    path('order_history/', GetAllOrderUser.as_view(), name='orders_user'),
    path('<str:pk>/', getOrderById.as_view(), name='order-by-id'),
    #path('<str:pk>/order_items/', AllOrderItems.as_view(), name='order_items'),
    path('<str:pk>/pay/', UpdateOrderToPaid.as_view(), name='order_is_paid'),

]
