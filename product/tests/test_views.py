from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model


def create_user(**params):
    return get_user_model().objects.create_user(**params)


class UnauthorizedProductViewIsNoStaff(TestCase):

    def setUp(self):
        self.client = APIClient()

    def testViewProduct(self):
        res = self.client.get(reverse('product:product-list'))
        self.assertEqual(res.status_code, status.HTTP_200_OK)


class AuthorizedProductViewIsStaff(TestCase):
    def setUp(self):
        self.user = create_user(
            email='test@free.fr',
            first_name='alex',
            password='ilfaitbeau',

        )
        self.user.is_staff = True
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def testViewProductList(self):
        res = self.client.get(reverse('product:product-list'))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
