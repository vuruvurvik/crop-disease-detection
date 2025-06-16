from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    section = models.CharField(max_length=10)

    def __str__(self):
        return self.name
from django.contrib.auth.models import AbstractUser,Group, Permission
from django.db import models


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255, default="Unnamed User")  # Add default value

    groups = models.ManyToManyField(Group, related_name="customuser_groups", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="customuser_permissions", blank=True)

    def __str__(self):
        return self.username

class CropImage(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True)
    image = models.ImageField(upload_to="crop_images/")
    plant_type = models.CharField(max_length=50, choices=[
        ("corn", "Corn"),
        ("sugarcane", "Sugarcane"),
        ("potato", "Potato"),
        ("rice", "Rice"),
        ("wheat", "Wheat"),
    ])
    disease_detected = models.CharField(max_length=255, blank=True, null=True)
    confidence = models.FloatField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.plant_type} - {self.disease_detected or 'Pending'}"
    
from django.db import models
from django.contrib.auth.models import User

from django.conf import settings

class DiagnosisHistory(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    plant_type = models.CharField(max_length=100)
    disease_detected = models.CharField(max_length=100)
    confidence_score = models.FloatField()
    image = models.ImageField(upload_to='history_images/')
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.disease_detected} ({self.plant_type})"

