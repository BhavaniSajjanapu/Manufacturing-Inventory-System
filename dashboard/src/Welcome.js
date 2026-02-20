import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "./assets/background.webp";

function Welcome() {
  const navigate = useNavigate();

  const handleBegin = () => {
    navigate("/dashboard"); // Go to dashboard after clicking Begin
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start", // move content toward top
paddingTop: "80px",            // distance from top
        alignItems: "center",
        height: "100vh",
        width: "100%",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        textAlign: "center",
        textShadow: "2px 2px 6px rgba(0,0,0,0.7)",
      }}
    >
      <h1 style={{ fontSize: "48px", fontWeight: "700", marginBottom: "20px" }}>
        Welcome to AI Inventory Management
      </h1>
      <p style={{ fontSize: "22px", marginBottom: "30px" }}>
        Let's manage inventory together!
      </p>
      <button
        onClick={handleBegin}
        style={{
          padding: "14px 28px",
          fontSize: "18px",
          fontWeight: "600",
          borderRadius: "8px",
          backgroundColor: "#1E88E5",
          color: "white",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#1565C0")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#1E88E5")}
      >
        Begin
      </button>
    </div>
  );
}

export default Welcome;
