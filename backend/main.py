# ------------------------------------------------------------
# 🌊 FloodShield Backend - FastAPI
# Author: Gaurav Kumbhare | Roll No: 3062
# ------------------------------------------------------------
from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware
import xgboost  # Ensure xgboost is installed

# ------------------------------------------------------------
# ✅ Initialize FastAPI App
# ------------------------------------------------------------
app = FastAPI(
    title="FloodShield - Flood Prediction API",
    description="AI-powered backend to predict flood risk using environmental parameters.",
    version="1.2.0"
)

# ------------------------------------------------------------
# 🌐 CORS Settings
# ------------------------------------------------------------
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

app = FastAPI()

origins = [
    "http://localhost:5173",              # frontend local
    "https://floodshield-phi.vercel.app", # your deployed site
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ------------------------------------------------------------
# 📘 Input Schema (Environmental Parameters)
# ------------------------------------------------------------
class FloodInput(BaseModel):
    station: str
    rainfall: float
    river_discharge: float
    water_level: float
    temperature: float
    humidity: float
    soil_type: str
    elevation: float
    latitude: float
    longitude: float

# ------------------------------------------------------------
# 🧠 Load Model and Scaler
# ------------------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "model" / "flood_model.pkl"
SCALER_PATH = BASE_DIR / "model" / "scaler.pkl"

model, scaler = None, None

# Encode soil type (match LabelEncoder in training)
SOIL_TYPE_MAPPING = {
    "Clay": 0,
    "Sandy": 1,
    "Loam": 2
}

# Encode station (replace with actual stations from your dataset)
STATION_MAPPING = {
    "Station1": 0,
    "Station2": 1,
    "Station3": 2
}

def load_artifacts():
    global model, scaler
    try:
        model = joblib.load(MODEL_PATH)
        scaler = joblib.load(SCALER_PATH)
        print("✅ Model and Scaler Loaded Successfully.")
    except FileNotFoundError as e:
        print(f"⚠️ Model or Scaler file not found: {e}")
    except Exception as e:
        print(f"⚠️ Error loading artifacts: {e}")

# ------------------------------------------------------------
# 🌍 Root Route
# ------------------------------------------------------------
@app.get("/")
def root():
    return {
        "message": "✅ Flood Prediction Backend is Running Successfully!",
        "author": "Gaurav Kumbhare",
        "status": "active",
        "frontend": "https://floodshield-phi.vercel.app"
    }

# ------------------------------------------------------------
# 🔮 Prediction Endpoint
# ------------------------------------------------------------
@app.post("/predict")
def predict_flood(data: FloodInput):
    if model is None or scaler is None:
        return {"error": "Model or Scaler not loaded. Please verify your model files."}

    try:
        # Encode soil type
        soil_numeric = SOIL_TYPE_MAPPING.get(data.soil_type.capitalize(), -1)
        if soil_numeric == -1:
            return {"error": f"Invalid soil type: {data.soil_type}. Allowed: {list(SOIL_TYPE_MAPPING.keys())}"}

        # Encode station
        station_numeric = STATION_MAPPING.get(data.station, -1)
        if station_numeric == -1:
            return {"error": f"Invalid station: {data.station}. Allowed: {list(STATION_MAPPING.keys())}"}

        # Build input array in exact order as model expects
        input_data = np.array([[
            station_numeric,
            data.rainfall,
            data.river_discharge,
            data.water_level,
            data.temperature,
            data.humidity,
            soil_numeric,
            data.elevation,
            data.latitude,
            data.longitude
        ]])

        # Verify feature count
        if input_data.shape[1] != scaler.mean_.shape[0]:
            return {"error": f"Feature mismatch: expected {scaler.mean_.shape[0]}, got {input_data.shape[1]}"}

        # Scale and predict
        scaled_data = scaler.transform(input_data)
        prediction = model.predict(scaled_data)[0]
        result = "🌊 Flood Likely" if prediction == 1 else "☀️ No Flood Risk"

        return {
            "prediction": int(prediction),
            "result": result,
            "frontend_linked": "https://floodshield-phi.vercel.app",
            "note": "Backend connected successfully with frontend."
        }

    except Exception as e:
        return {"error": f"Prediction failed: {str(e)}"}

# ------------------------------------------------------------
# 🟢 Startup Event
# ------------------------------------------------------------
@app.on_event("startup")
def startup_event():
    print("🚀 Starting FloodShield API...")
    load_artifacts()
    print(f"📂 Monitoring model directory: {Path(MODEL_PATH).parent}")
