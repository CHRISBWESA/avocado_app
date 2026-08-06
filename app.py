import os
import cv2
import numpy as np
import onnxruntime as ort
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import base64

app = Flask(__name__, static_folder="public", static_url_path="")
CORS(app)


# ===============================
# LOAD ONNX MODEL
# ===============================

MODEL_PATH = os.path.join(os.path.dirname(__file__), "assets", "models", "model_parachichi.onnx")

print("=" * 50)
print("Loading Avocado AI Model...")
print("Model path:", MODEL_PATH)

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(
        f"Model file not found: {MODEL_PATH}"
    )

session = ort.InferenceSession(MODEL_PATH)

input_name = session.get_inputs()[0].name
input_shape = session.get_inputs()[0].shape
output_name = session.get_outputs()[0].name

print("Model loaded successfully!")
print("Input name:", input_name)
print("Input shape:", input_shape)
print("Output name:", output_name)
print("=" * 50)



# ===============================
# IMAGE PREPROCESSING
# ===============================

def preprocess_image(image_bytes):

    nparr = np.frombuffer(
        image_bytes,
        np.uint8
    )

    img = cv2.imdecode(
        nparr,
        cv2.IMREAD_COLOR
    )


    if img is None:
        raise ValueError(
            "Invalid image file"
        )


    # Resize to model input size with high quality interpolation
    img = cv2.resize(
        img,
        (224, 224),
        interpolation=cv2.INTER_LANCZOS4
    )


    # Convert BGR to RGB
    img = cv2.cvtColor(
        img,
        cv2.COLOR_BGR2RGB
    )


    # Normalize pixel values to [0, 1]
    img = img.astype(
        np.float32
    ) / 255.0


    # Apply CLAHE for better contrast
    lab = cv2.cvtColor(
        (img * 255).astype(np.uint8),
        cv2.COLOR_RGB2LAB
    )
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    lab[:, :, 0] = clahe.apply(lab[:, :, 0])
    img = cv2.cvtColor(lab, cv2.COLOR_LAB2RGB).astype(np.float32) / 255.0


    # Add batch dimension
    img = np.expand_dims(
        img,
        axis=0
    )


    return img



# 5 avocado ripeness classes
CLASSES = [
    {"name": "Underripe", "desc": "Firm and bright green. Not ready to eat yet.", "color": "#8D6E63"},
    {"name": "Breaking", "desc": "Starting to soften, transitioning from green.", "color": "#4CAF50"},
    {"name": "Ripe (First Stage)", "desc": "Slightly soft, beginning to yield. Good for cooking.", "color": "#66BB6A"},
    {"name": "Ripe (Second Stage)", "desc": "Perfectly soft and creamy. Ideal for eating!", "color": "#43A047"},
    {"name": "Overripe", "desc": "Very soft, may have brown spots inside. Use soon.", "color": "#9CCC65"},
]


def predict_from_output(outputs):
    output = outputs[0]
    if len(output.shape) == 1 or output.shape[1] == 1:
        confidence_score = float(output[0][0])
        if confidence_score >= 0.5:
            idx = 2
            confidence_percentage = round(confidence_score * 100, 2)
        else:
            idx = 0
            confidence_percentage = round((1 - confidence_score) * 100, 2)
    else:
        probs = output[0]
        idx = int(np.argmax(probs))
        confidence_percentage = round(float(probs[idx]) * 100, 2)

    cls = CLASSES[idx]
    return {
        "status": "success",
        "ripeness": cls["name"],
        "quality": cls["name"],
        "confidence": f"{confidence_percentage}%",
        "recommendation": cls["desc"],
        "class_index": idx,
        "confidence_score": confidence_percentage,
    }


# ===============================
# HOME PAGE
# ===============================

@app.route("/")
def home():
    return send_from_directory("public", "index.html")



# ===============================
# PREDICT (FILE UPLOAD)
# ===============================

@app.route(
    "/predict",
    methods=["POST"]
)
def predict():


    if "file" not in request.files:

        return jsonify({
            "error": "No image uploaded"
        }), 400



    file = request.files["file"]



    if file.filename == "":

        return jsonify({
            "error": "Empty filename"
        }), 400



    try:


        image_bytes = file.read()


        processed_image = preprocess_image(
            image_bytes
        )


        # ONNX inference
        outputs = session.run(
            None,
            {
                input_name: processed_image
            }
        )

        result = predict_from_output(outputs)

        return jsonify(result)



    except Exception as e:


        return jsonify({

            "error": f"Inference failed: {str(e)}"

        }), 500



# ===============================
# PREDICT (BASE64)
# ===============================

@app.route(
    "/predict_base64",
    methods=["POST"]
)
def predict_base64():

    data = request.get_json()

    if not data or "image_base64" not in data:
        return jsonify({
            "error": "No image data"
        }), 400

    try:
        image_base64 = data["image_base64"]
        if "," in image_base64:
            image_base64 = image_base64.split(",")[1]
        image_bytes = base64.b64decode(image_base64)
        processed_image = preprocess_image(image_bytes)

        outputs = session.run(
            None,
            {
                input_name: processed_image
            }
        )

        result = predict_from_output(outputs)

        return jsonify(result)

    except Exception as e:
        return jsonify({
            "error": f"Inference failed: {str(e)}"
        }), 500



@app.route("/<path:path>")
def catch_all(path):
    if os.path.exists(os.path.join("public", path)):
        return send_from_directory("public", path)
    return send_from_directory("public", "index.html")


# ===============================
# RUN SERVER
# ===============================

if __name__ == "__main__":

    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))