from abc import ABC
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import User

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email',
                  'first_name',
                  'last_name',
                  'address',
                  'phone',
                  'postcode',
                  'city',
                  'password',
                  ]

    def create(self, validated_data):
        print(validated_data)
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
            instance.save()
        return instance


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'address', 'postcode', 'phone', 'city', 'is_staff',
                  'is_active']


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'address', 'postcode', 'phone', 'city', 'token', 'is_active']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
