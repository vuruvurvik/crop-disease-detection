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