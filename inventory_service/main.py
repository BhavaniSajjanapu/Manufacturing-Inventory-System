from fastapi import FastAPI
import sqlite3
import pandas as pd
import os
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins (for development)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE = "inventory.db"

def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS inventory (
        id INTEGER PRIMARY KEY,
        item_name TEXT,
        category TEXT,
        quantity_in_stock INTEGER,
        reorder_level INTEGER,
        supplier TEXT,
        last_updated TEXT
    )
    """)

    conn.commit()
    conn.close()

def load_excel_data():
    if not os.path.exists(DATABASE):
        return

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM inventory")
    count = cursor.fetchone()[0]

    if count == 0:
        df = pd.read_excel("inventory.xlsx", sheet_name="Sheet1")
        df.to_sql("inventory", conn, if_exists="append", index=False)

    conn.close()

@app.on_event("startup")
def startup():
    init_db()
    load_excel_data()

@app.get("/items")
def get_items():
    conn = sqlite3.connect(DATABASE)
    df = pd.read_sql_query("SELECT * FROM inventory", conn)
    conn.close()
    return df.to_dict(orient="records")

@app.get("/summary")
def get_summary():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM inventory")
    total_items = cursor.fetchone()[0]

    cursor.execute("SELECT SUM(quantity_in_stock) FROM inventory")
    total_quantity = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM inventory WHERE quantity_in_stock <= reorder_level")
    low_stock = cursor.fetchone()[0]

    conn.close()

    return {
        "total_items": total_items,
        "total_quantity": total_quantity,
        "low_stock_items": low_stock
    }

@app.get("/low_stock")
def low_stock_items():
    conn = sqlite3.connect(DATABASE)
    df = pd.read_sql_query(
        "SELECT * FROM inventory WHERE quantity_in_stock <= reorder_level",
        conn
    )
    conn.close()
    return df.to_dict(orient="records")
class UpdateStock(BaseModel):
    quantity_in_stock: int

@app.put("/update/{item_id}")
def update_item(item_id: int, stock: UpdateStock):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute(
        "UPDATE inventory SET quantity_in_stock = ?, last_updated = ? WHERE id = ?",
        (stock.quantity_in_stock, datetime.now().strftime("%Y-%m-%d %H:%M:%S"), item_id)
    )

    conn.commit()
    conn.close()

    return {"message": "Stock updated successfully"}
class NewItem(BaseModel):
    item_name: str
    category: str = ""
    quantity_in_stock: int
    reorder_level: int
    supplier: str = ""

@app.post("/items")
def add_item(item: NewItem):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    # Insert new item
    cursor.execute(
        """
        INSERT INTO inventory (item_name, category, quantity_in_stock, reorder_level, supplier, last_updated)
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
            item.item_name,
            item.category,
            item.quantity_in_stock,
            item.reorder_level,
            item.supplier,
            datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        )
    )

    conn.commit()

    # Get the last inserted id
    item_id = cursor.lastrowid

    conn.close()

    return {
        "id": item_id,
        "item_name": item.item_name,
        "category": item.category,
        "quantity_in_stock": item.quantity_in_stock,
        "reorder_level": item.reorder_level,
        "supplier": item.supplier,
        "last_updated": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute("DELETE FROM inventory WHERE id = ?", (item_id,))
    conn.commit()
    conn.close()

    return {"message": "Item deleted successfully"}
