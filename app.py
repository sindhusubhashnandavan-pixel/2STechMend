from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import os
from model_train import train_model

# 1. Initialize FastAPI app
app = FastAPI(title="Computer Shop Pricing API")

# 2. Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_credentials=True, 
    allow_headers=["*"],
)

# 3. Load or train model on startup
MODEL_PATH = "model.pkl"

@app.on_event("startup")
def startup_event():
    if not os.path.exists(MODEL_PATH):
        print("model.pkl not found. Training model now...")
        train_model()
    global model
    model = joblib.load(MODEL_PATH)
    print("Model loaded successfully.")

# 4. Define request schema
class PredictionRequest(BaseModel):
    cpu_ghz: float
    ram_gb: int
    storage_gb: int
    gpu_rank: int # 0 to 4

# 5. Prediction endpoint
@app.post("/predict")
async def predict(request: PredictionRequest):
    try:
        # Prepare features for the model
        features = [[
            request.cpu_ghz,
            request.ram_gb,
            request.storage_gb,
            request.gpu_rank
        ]]
        
        # Make prediction
        prediction = model.predict(features)[0]
        
        return {
            "prediction": f"${max(0, prediction):.2f}",
            "confidence": 0.95 # Generic confidence for this simple regression model
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Health check
@app.get("/")
def read_root():
    return {"status": "ByteLink API is active"}
