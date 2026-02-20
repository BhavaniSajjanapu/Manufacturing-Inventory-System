// src/InventoryTable.js
import React, { useEffect, useState } from "react";
import axios from "axios";

// Step 1: Backend API base URL
const inventoryApi = "http://127.0.0.1:8000";

function InventoryTable() {
  const [inventory, setInventory] = useState([]);
  const inventoryApi = "http://127.0.0.1:8000"; // adjust if your backend URL is different

  // Fetch inventory data from backend
  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axios.get(`${inventoryApi}/items`);
      setInventory(res.data);
    } catch (err) {
      console.error("Error fetching inventory:", err.response || err.message);
      alert("Failed to fetch inventory. Check console for details.");
    }
  };

  // Handle item quantity update
  const handleUpdate = async (item) => {
  const newQuantityStr = window.prompt(
    `Enter new quantity for "${item.item_name}":`,
    item.quantity_in_stock
  );
  if (newQuantityStr === null) return;

  const newQuantity = Number(newQuantityStr);
  if (isNaN(newQuantity) || newQuantity < 0) {
    alert("Please enter a valid number ≥ 0");
    return;
  }

  try {
    // Send entire item object in case backend expects more than just quantity
    await axios.put(`${inventoryApi}/items/${item.id}`, {
      ...item,
      quantity_in_stock: newQuantity,
    });

    // Update local state immediately
    setInventory((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, quantity_in_stock: newQuantity } : i
      )
    );

    alert("Item updated successfully!");
  } catch (err) {
    console.error("Update failed:", err.response || err.message);
    alert(
      "Failed to update item. Make sure your backend is running and API is correct."
    );
  }
};

  // Handle item deletion
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${inventoryApi}/items/${id}`);

      // Update local state
      setInventory(inventory.filter((item) => item.id !== id));
      alert("Item deleted successfully!");
    } catch (err) {
      console.error("Error deleting item:", err.response || err.message);
      alert("Failed to delete item. Check console for details.");
    }
  };

  function InventoryTable() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    const res = await axios.get(`${inventoryApi}/items`);
    setInventory(res.data);
  };

  // Step 2: handleUpdate goes here

  const handleDelete = async (id) => {
    // similar to handleUpdate, delete logic here
  };

  return (
    <div>
      <h2>Inventory Table</h2>
      <table>
        <thead> ... </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.item_name}</td>
              <td>{item.quantity_in_stock}</td>
              <td>{item.reorder_level}</td>
              <td>
                <button onClick={() => handleUpdate(item)}>Update</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

  return (
    <div>
      <h2>Inventory Table</h2>
      <table
        width="100%"
        cellPadding="10"
        style={{ borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead style={{ backgroundColor: "#e3eafc" }}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity in Stock</th>
            <th>Reorder Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                No items found.
              </td>
            </tr>
          ) : (
            inventory.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.item_name}</td>
                <td>{item.quantity_in_stock}</td>
                <td>{item.reorder_level}</td>
                <td>
                  <button
                    onClick={() => handleUpdate(item.id)}
                    style={{
                      marginRight: "10px",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                      backgroundColor: "#1E88E5",
                      color: "white",
                    }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                      backgroundColor: "#E53935",
                      color: "white",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryTable;