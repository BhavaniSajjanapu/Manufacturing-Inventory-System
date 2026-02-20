from fastapi import FastAPI
import requests
import pandas as pd
import random
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="AI Predictive Inventory Service")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

INVENTORY_URL = "http://127.0.0.1:8000/items"

def fetch_inventory():
    try:
        response = requests.get(INVENTORY_URL, timeout=5)
        response.raise_for_status()
        return pd.DataFrame(response.json())
    except Exception as e:
        return pd.DataFrame()


@app.get("/ai_summary")
def ai_summary():
    df = fetch_inventory()

    total_items = len(df)

    low_stock_df = df[df["quantity_in_stock"] <= df["reorder_level"]]

    return {
        "total_items": total_items,
        "low_stock_items": len(low_stock_df)
    }


@app.get("/predict_demand")
def predict_demand():
    df = fetch_inventory()

    predictions = []

    for _, row in df.iterrows():

        # Simulate 7 days historical demand
        historical_demand = np.random.randint(1, 15, size=7)

        # Moving average (AI logic)
        moving_avg_demand = round(np.mean(historical_demand), 2)

        if moving_avg_demand == 0:
            days_remaining = "Stable"
        else:
            days_remaining = round(row["quantity_in_stock"] / moving_avg_demand, 1)

        risk_level = "Low"

        if isinstance(days_remaining, float):
            if days_remaining < 5:
                risk_level = "High"
            elif days_remaining < 10:
                risk_level = "Medium"

        predictions.append({
            "item_name": row["item_name"],
            "current_stock": row["quantity_in_stock"],
            "7_day_avg_demand": moving_avg_demand,
            "estimated_days_remaining": days_remaining,
            "risk_level": risk_level
        })

    return predictions




@app.get("/smart_restock_plan")
def smart_restock_plan():
    df = fetch_inventory()

    plan = []

    for _, row in df.iterrows():

        daily_demand = random.randint(1, 10)

        if daily_demand == 0:
            continue

        days_remaining = row["quantity_in_stock"] / daily_demand

        priority_score = 100 - days_remaining

        if priority_score > 80:
            action = "Immediate Restock"
        elif priority_score > 60:
            action = "Plan Restock Soon"
        else:
            action = "Monitor"

        plan.append({
            "item_name": row["item_name"],
            "supplier": row["supplier"],
            "priority_score": round(priority_score, 2),
            "recommended_action": action
        })

    return sorted(plan, key=lambda x: x["priority_score"], reverse=True)
@app.get("/ml_forecast")
def ml_forecast():
    df = fetch_inventory()

    results = []

    for _, row in df.iterrows():

        # Simulate 30 days historical demand
        days = np.array(range(1, 31)).reshape(-1, 1)
        historical_demand = np.random.randint(5, 20, size=30)

        # Train model
        model = LinearRegression()
        model.fit(days, historical_demand)

        # Evaluate model
        predictions_train = model.predict(days)
        r2 = round(r2_score(historical_demand, predictions_train), 3)

        # Predict next 7 days
        future_days = np.array(range(31, 38)).reshape(-1, 1)
        predicted_demand = model.predict(future_days)

        avg_future_demand = round(np.mean(predicted_demand), 2)

        if avg_future_demand == 0:
            days_remaining = "Stable"
        else:
            days_remaining = round(row["quantity_in_stock"] / avg_future_demand, 1)

        risk = "Low"

        if isinstance(days_remaining, float):
            if days_remaining < 5:
                risk = "High"
            elif days_remaining < 10:
                risk = "Medium"

        results.append({
            "item_name": row["item_name"],
            "current_stock": row["quantity_in_stock"],
            "predicted_avg_7day_demand": avg_future_demand,
            "model_r2_score": r2,
            "estimated_days_remaining": days_remaining,
            "risk_level": risk
        })

    return results
