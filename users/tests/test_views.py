from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient


def create_user(**params):
    return get_user_model().objects.create_user(**params)


class TestRegisterUser(TestCase):

    def setUp(self):
        self.client = APIClient()

    def test_create_user_success(self):
        payload = {
            'email': 'test@free.Fr.com',
            'first_name': 'alex',
            'password': 'muaythai'
        }
        res = self.client.post(reverse('users:create_user'), payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_create_user_with_wrong_email(self):
        payload = {
            'email': 'testfree.com',
            'first_name': 'alex',
            'password': 'muaythai'
        }
        res = self.client.post(reverse('users:create_user'), payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_user_without_domain_extension(self):
        payload = {
            'email': 'test@free',
            'first_name': 'alex',
            'password': 'muaythai'
        }
        res = self.client.post(reverse('users:create_user'), payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)


class TestLoginUser(TestCase):

    def setUp(self):
        self.user = create_user(
            email='test@free.fr',
            password='Test123',

        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_login_success_create_token_for_user(self):
        payload = {
            'email': 'test@free.fr',
            'password': 'Test123',
        }
        res = self.client.post(reverse('token_obtain_pair'), payload)
        self.assertIn('access', res.data)
        self.assertIn('refresh', res.data)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_login_user_wrong_email(self):
        payload = {
            'email': 'FalseEmail@free.fr',
            'password': 'Test123',
        }

        res = self.client.post(reverse('token_obtain_pair'), payload)
        self.assertNotIn('access', res.data)
        self.assertNotIn('refresh', res.data)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_login_user_wrong_password(self):
        payload = {
            'email': 'test@free.fr',
            'password': 'WrongPassword',
        }
        res = self.client.post(reverse('token_obtain_pair'), payload)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_login_user_not_exist(self):
        payload = {
            'email': 'NotExist@free.fr',
            'password': 'NotExist',
        }

        res = self.client.post(reverse('token_obtain_pair'), payload)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

