import React from "react";
import summaryIcon from "./assets/summary.webp";
import addItemIcon from "./assets/add-item.webp";
import inventoryIcon from "./assets/inventory.webp";
import forecastIcon from "./assets/forecast.webp";
import endIcon from "./assets/end.webp";

function Sidebar({ setActivePage }) {
  const navButtons = [
    { title: "Summary", icon: summaryIcon, page: "summary", color: "#1E88E5" },
    { title: "Add Item", icon: addItemIcon, page: "add", color: "#1E88E5" },
    { title: "Inventory", icon: inventoryIcon, page: "inventory", color: "#1E88E5" },
    { title: "ML Forecast", icon: forecastIcon, page: "forecast", color: "#1E88E5" },
    { title: "End", icon: endIcon, page: "end", color: "#E53935" },
  ];

  return (
    <div
      style={{
        width: "240px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",  // vertical center
        alignItems: "center",
        backgroundColor: "#1565C0",
        padding: "20px 0",
      }}
    >
      {navButtons.map((btn, index) => (
        <button
          key={index}
          onClick={() => setActivePage(btn.page)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "16px 20px",
            fontSize: "18px",
            fontWeight: 600,
            marginBottom: "20px",
            borderRadius: "10px",
            backgroundColor: btn.color,
            border: "none",
            cursor: "pointer",
            color: "white",
            width: "180px",
            transition: "all 0.3s ease",
          }}
        >
          <img src={btn.icon} alt={btn.title} style={{ width: "24px", height: "24px" }} />
          <span>{btn.title}</span>
        </button>
      ))}
    </div>
  );
}

export default Sidebar;