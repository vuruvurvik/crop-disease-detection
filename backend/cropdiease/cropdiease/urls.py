"""cropdiease URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from prediction.views import LoginView,SignupView,CropImageUploadView,chatbot_response,user_history
from django.contrib import admin
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [  
    path('admin/', admin.site.urls),
    path('login/', LoginView.as_view(), name='login'),
    path("signup/", SignupView.as_view(), name="signup"),
    path("upload/", CropImageUploadView.as_view(), name="crop-image-upload"),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("chatbot/", chatbot_response, name="chatbot_response"),
    path('history/', user_history, name='user_history'),
]
