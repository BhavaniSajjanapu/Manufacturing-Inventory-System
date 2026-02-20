import React, { useState } from "react";
import axios from "axios";

function AddItem() {
  const [newItem, setNewItem] = useState({ item_name:"", quantity_in_stock:"", reorder_level:"" });

  const addItem = async () => {
    if (!newItem.item_name || !newItem.quantity_in_stock || !newItem.reorder_level) {
      alert("Please fill all fields");
      return;
    }
    await axios.post("http://127.0.0.1:8000/items", {
      item_name: newItem.item_name,
      quantity_in_stock: parseInt(newItem.quantity_in_stock),
      reorder_level: parseInt(newItem.reorder_level)
    });
    setNewItem({ item_name:"", quantity_in_stock:"", reorder_level:"" });
    alert("Item added successfully");
  };

  const inputStyle = { padding:"6px 10px", marginRight:"10px", borderRadius:"6px", border:"1px solid #ccc" };
  const buttonStyle = { padding:"8px 16px", borderRadius:"6px", backgroundColor:"#4CAF50", color:"white", border:"none", cursor:"pointer" };

  return (
    <div>
      <h2>Add New Item</h2>
      <input 
        type="text" placeholder="Item Name" value={newItem.item_name} 
        onChange={e => setNewItem({...newItem, item_name:e.target.value})} style={inputStyle} 
      />
      <input 
        type="number" placeholder="Quantity" value={newItem.quantity_in_stock} 
        onChange={e => setNewItem({...newItem, quantity_in_stock:e.target.value})} style={inputStyle} 
      />
      <input 
        type="number" placeholder="Reorder Level" value={newItem.reorder_level} 
        onChange={e => setNewItem({...newItem, reorder_level:e.target.value})} style={inputStyle} 
      />
      <button onClick={addItem} style={buttonStyle}>Add</button>
    </div>
  );
}

export default AddItem;
