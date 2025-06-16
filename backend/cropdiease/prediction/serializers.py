from rest_framework import serializers
from .models import Student

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'
##########################################################################################
from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model

User = get_user_model()

class LoginSerializer(serializers.Serializer):
    """Handles user login with username and password."""
    
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        """Validate credentials and return access token."""
        username = data.get("username")
        password = data.get("password")
        user = authenticate(username=username, password=password)

        if not user:
            raise serializers.ValidationError("Invalid username or password")

        refresh = RefreshToken.for_user(user)  # Generate JWT token

        return {
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "id": user.id,
                "username": user.username,
            },
        }

class SignupSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "full_name", "email", "password", "password2"]

    def validate(self, data):
        if data["password"] != data["password2"]:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return data

    def create(self, validated_data):
        validated_data.pop("password2")  # Remove password2
        user = User.objects.create_user(**validated_data)
        return user

from .models import CropImage

class CropImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CropImage
        fields = ["id", "user", "image", "plant_type", "disease_detected", "confidence", "timestamp"]
        read_only_fields = ["disease_detected", "confidence"]

from rest_framework import serializers
from .models import DiagnosisHistory

class DiagnosisHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = DiagnosisHistory
        fields = '__all__'
