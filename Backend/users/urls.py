from django.urls import path


from .views import CustomUserCreate, UserDetailsProfile, UpdateUserData, BlacklistTokenView,UpdatePasswordUser,\
    GetUsersViews

app_name = 'user'

urlpatterns = [
    path('', GetUsersViews.as_view(), name='get-users-views'),
    path('register/', CustomUserCreate.as_view(), name='create_user'),
    path('profile/', UserDetailsProfile.as_view(), name='user_profile'),
    path('account-update/', UpdateUserData.as_view(), name='update-data-user'),
    path('logout/blacklist/', BlacklistTokenView.as_view(), name='blacklist'),
    path('account-update-password/', UpdatePasswordUser.as_view(), name='update-password-user')
]