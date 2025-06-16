import tensorflow as tf
import numpy as np
from PIL import Image
import os

# Define correct model paths with .keras model files
MODEL_PATHS = {
    "corn": "models/crop_disease_corn_model_vgg16.keras",
    "sugarcane": "models/crop_disease_sugarcane_model_vgg16.keras",
    "potato": "models/crop_disease_potato_model_vgg16.keras",
    "rice": "models/crop_disease_rice_model_vgg16.keras",
    "wheat": "models/crop_disease_model_wheat_vgg16.keras",
}

# Class labels for prediction
CLASS_LABELS = {
    "corn": ["Healthy", "Blight", "Rust"],
    "sugarcane": ['Bacterial_Blight', 'Healthy', 'Red_Rot'],
    "potato": ['Potato___Early_Blight', 'Potato___Healthy', 'Potato___Late_Blight'],
    "rice": ['Rice___Brown_Spot', 'Rice___Healthy', 'Rice___Leaf_Blast', 'Rice___Neck_Blast'],
    "wheat": ['Wheat___Brown_Rust', 'Wheat___Healthy', 'Wheat___Yellow_Rust'],
}

# Dictionary to store loaded models
LOADED_MODELS = {}

def load_models():
    """Load Keras .keras models for different crops"""
    for plant, model_path in MODEL_PATHS.items():
        if os.path.exists(model_path):
            try:
                print(f"✅ Loading .keras model for {plant} from {model_path}...")
                LOADED_MODELS[plant] = tf.keras.models.load_model(model_path, compile=False)
                print(f"✅ Model for {plant} loaded successfully!")
            except Exception as e:
                print(f"❌ Failed to load model for {plant}: {e}")
        else:
            print(f"⚠️ Model for {plant} not found at {model_path}!")

def preprocess_image(image_path):
    """Preprocess image to fit the model's input requirements"""
    try:
        img = Image.open(image_path).convert("RGB").resize((256, 256))
        img_array = np.array(img) / 255.0  # Normalize
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
        return img_array
    except Exception as e:
        print(f"❌ Error processing image: {e}")
        return None

def predict_disease(image_path, plant_type):
    """Predict disease using the corresponding model"""
    model = LOADED_MODELS.get(plant_type)
    
    if model is None:
        print(f"⚠️ No model loaded for {plant_type}!")
        return "Model Not Found", 0

    processed_image = preprocess_image(image_path)
    if processed_image is None:
        return "Processing Error", 0

    try:
        predictions = model.predict(processed_image)
        predicted_class_index = np.argmax(predictions)

        if predicted_class_index >= len(CLASS_LABELS[plant_type]):
            print(f"⚠️ Predicted class index {predicted_class_index} is out of range for {plant_type}")
            return "Unknown", 0

        confidence = round(float(np.max(predictions)) * 100, 2)
        predicted_class = CLASS_LABELS[plant_type][predicted_class_index]

        print(f"🔍 Prediction for {plant_type}: {predicted_class} ({confidence}%)")
        return predicted_class, confidence

    except Exception as e:
        print(f"❌ Error during prediction: {e}")
        return "Prediction Error", 0

# Load models on startup
load_models()
