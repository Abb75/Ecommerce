from django.contrib.auth.hashers import make_password

from rest_framework import status, mixins, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.templatetags.rest_framework import data
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User
from .serializers import RegisterUserSerializer, UserSerializer, UserSerializerWithToken


class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        print(request)
        if request.method == "POST":

            register_serializer = RegisterUserSerializer(data=request.data)
          
            if register_serializer.is_valid():

                new_user = register_serializer.save()

                if new_user:
                    return Response(status=status.HTTP_201_CREATED)

            return Response(register_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetUsersViews(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)


class BlacklistTokenView(APIView):

    def post(self, request):

        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

        except Exception as e:

            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response("Success")


class UpdateUserData(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        serializer = UserSerializerWithToken(user, many=False)
        data = request.data
        user.email = data['email']
        user.first_name = data['first_name']
        user.last_name = data['last_name']
        user.phone = data['phone']
        user.postcode = data['postcode']
        user.city = data['city']
        user.address = data['address']
        user.save()

        return Response(serializer.data)


class UserDetailsProfile(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        print(user)
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UpdatePasswordUser(APIView):
    
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        serializer = UserSerializerWithToken(user, many=False)
        data = request.data
        if data['password'] != '':
            user.password = make_password(data['password'])

        user.save()

        return Response(serializer.data)
