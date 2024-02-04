from django.conf import settings
from django.db import models
from django.db.models import SET_NULL

from product.models import Products


class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return str(self.user)


class OrderItem(models.Model):
    product = models.ForeignKey(Products, on_delete=SET_NULL, null=True)
    order = models.ForeignKey(Order, related_name='order_items', on_delete=SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    quantity = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    image = models.ImageField()

    class Meta:
        unique_together = ['order', 'name', 'price', 'quantity', 'image']

    def __str__(self):
        return str(self.name)
