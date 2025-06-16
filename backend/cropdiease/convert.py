import tensorflow as tf

try:
    model = tf.keras.models.load_model("models/full_wheat_model", compile=False)  # ✅ Load without compiling
    print("✅ Model loaded successfully!")
except Exception as e:
    print(f"❌ Model failed to load: {e}")
