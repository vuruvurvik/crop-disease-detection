from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import DiagnosisHistory


class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            
            # Default redirect for all users
            redirect_url = "/user"

            return Response(
                {
                    "access": str(refresh.access_token),
                    "user": {"username": user.username},
                    "redirect_url": redirect_url  # Send redirect URL in response
                },
                status=status.HTTP_200_OK,
            )

        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

from .serializers import SignupSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class SignupView(APIView):
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {"message": "User created successfully", "user": {"username": user.username}},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from django.core.files.storage import default_storage
from .models import CropImage
from .serializers import CropImageSerializer
from .tensorflow_model import predict_disease

from rest_framework_simplejwt.authentication import JWTAuthentication  # ✅ Use JWT Authentication

class CropImageUploadView(APIView):
    authentication_classes = [JWTAuthentication]  # ✅ Ensure JWT Authentication
    permission_classes = [IsAuthenticated]  # ✅ Require authentication
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        print("🔍 Received Authorization Header:", request.headers.get("Authorization"))  # Debugging

        if not request.headers.get("Authorization"):
            return Response({"error": "No authorization header received"}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = CropImageSerializer(data=request.data)
        if serializer.is_valid():
            uploaded_file = serializer.validated_data["image"]
            file_path = default_storage.save(f"temp/{uploaded_file.name}", uploaded_file)

            # Run TensorFlow model
            plant_type = serializer.validated_data["plant_type"]
            predicted_disease, confidence = predict_disease(default_storage.path(file_path), plant_type)

            # Save to database
            crop_image = serializer.save(
                user=request.user,
                disease_detected=predicted_disease,
                confidence=confidence
            )
            DiagnosisHistory.objects.create(
    user=request.user,
    plant_type=plant_type,
    disease_detected=predicted_disease,
    confidence_score=confidence,
    image=uploaded_file,
)

            return Response({
                "message": "Image analyzed successfully",
                "data": {
                    "disease_detected": predicted_disease,
                    "confidence": confidence,
                    "plant_type": plant_type,
                    "image_url": request.build_absolute_uri(crop_image.image.url),
                }
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

import google.generativeai as genai
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.conf import settings  # ✅ Import settings to access the API key

# Configure Gemini AI
genai.configure(api_key=settings.GENAI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

@csrf_exempt
def chatbot_response(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_message = data.get("message", "")

            if not user_message:
                return JsonResponse({"error": "Message cannot be empty"}, status=400)

            # Generate AI response
            response = model.generate_content(user_message,generation_config={"max_output_tokens": 150, "temperature": 0.7})

            return JsonResponse({"response": response.text})

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import DiagnosisHistory
from .serializers import DiagnosisHistorySerializer

@api_view(['GET'])
def user_history(request):
    history = DiagnosisHistory.objects.filter(user=request.user).order_by('-timestamp')
    serializer = DiagnosisHistorySerializer(history, many=True)
    return Response(serializer.data)
