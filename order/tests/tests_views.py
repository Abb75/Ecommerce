from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from product.models import Products, Category
from ..models import OrderItem, Order
from ..models import Order, OrderItem
from django.core.files.uploadedfile import SimpleUploadedFile

# CREATE_USER_URL = reverse('user:register')


# def create_user(**params):
#   return get_user_model().objects.create_user(**params)

ORDER_URL = reverse('order:order_add')


def create_product(**kwargs):
    return Products.objects.create(**kwargs)


def create_order(user, totalPrice):
    return Order.objects.create(user=user, totalPrice=totalPrice)


def create_order_Items(**kwargs):
    return OrderItem.objects.create(**kwargs)


def create_category(**kwargs):
    return Category.objects.create(**kwargs)


class PublicOrderApiTests(TestCase):

    def setUp(self):
        self.client = APIClient()

    def test_login_required(self):
        res = self.client.get(ORDER_URL)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateOrderApiTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            'alex@free.fr',
            'Muaythai75!!!'
        )
        self.client.force_authenticate(self.user)

    def test_create_order_valid(self):
        category = create_category(name='Computer')
        product1 = create_product(title='Mac', price=199.99, slug='mac', category=category)
        print(product1.id)
        get_product = Products.objects.get(id=product1.id)
        print(get_product)
        order = create_order(user=self.user, totalPrice=199.99)
        payload = {
            'user': self.user,
            'totalPrice': 199.99,
            'orderItems': [{
                'product': get_product,
                'order': order,
                'name': product1.title,
                'quantity': 1,
                'price': product1.price,
                'image': SimpleUploadedFile(name='media/photo/Odinateur_1izbd1m.jpg', content=b'',
                                            content_type='image/jpeg')

            }]
        }

        res = self.client.post(ORDER_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
