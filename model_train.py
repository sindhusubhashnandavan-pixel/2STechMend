import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import joblib
import os

# 1. Create/Load Dataset
# We'll generate synthetic data representing common computer specs and their prices
def generate_data(samples=1000):
    np.random.seed(42)
    # CPU (1.5 to 5.0 GHz)
    cpu = np.random.uniform(1.5, 5.0, samples)
    # RAM (4, 8, 16, 32, 64 GB)
    ram = np.random.choice([4, 8, 16, 32, 64], samples)
    # Storage (256, 512, 1024, 2048 GB)
    storage = np.random.choice([256, 512, 1024, 2048], samples)
    # GPU Rank (0: Integrated, 1: Budget, 2: Mid, 3: High, 4: Ultra)
    gpu = np.random.randint(0, 5, samples)

    # Base price + contributions from parts
    price = (200 + 
             cpu * 100 + 
             ram * 10 + 
             storage * 0.15 + 
             gpu * 250 + 
             np.random.normal(0, 50, samples))
    
    return pd.DataFrame({
        'cpu_ghz': cpu,
        'ram_gb': ram,
        'storage_gb': storage,
        'gpu_rank': gpu,
        'price': price
    })

def train_model():
    print("Generating synthetic computer hardware data...")
    df = generate_data()

    # Features and Target
    X = df[['cpu_ghz', 'ram_gb', 'storage_gb', 'gpu_rank']]
    y = df['price']

    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # 2. Train model
    print("Training Linear Regression model...")
    model = LinearRegression()
    model.fit(X_train, y_train)

    # 3. Save model
    joblib.dump(model, 'model.pkl')
    print("Model saved as model.pkl")

    # 4. Print results
    y_pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    # For regression, R^2 score is a good measure of "accuracy"
    score = model.score(X_test, y_test)
    print(f"Mean Absolute Error: ${mae:.2f}")
    print(f"Model R^2 Score (Accuracy): {score:.4f}")

if __name__ == "__main__":
    train_model()
