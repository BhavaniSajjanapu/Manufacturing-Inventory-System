import React from "react";
import bgImage from "./assets/end-bg.jpg";

function EndPage({ onRestart }) {
  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "#ffffff",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <div style={{ maxWidth: "700px" }}>
        <h1
          style={{
            fontSize: "46px",
            fontWeight: 700,
            marginBottom: "25px",
            textShadow: "3px 3px 12px rgba(0,0,0,0.9)",
          }}
        >
          Thank You for Using AI Inventory Management!
        </h1>
        <p
          style={{
            fontSize: "26px",
            marginBottom: "15px",
            textShadow: "2px 2px 10px rgba(0,0,0,0.8)",
          }}
        >
          Monitor, forecast, and optimize
        </p>
        <p
          style={{
            fontSize: "24px",
            textShadow: "2px 2px 10px rgba(0,0,0,0.8)",
          }}
        >
          Stay efficient. Stay ahead. Stay smart.
        </p>

        {onRestart && (
          <button
            onClick={onRestart}
            style={{
              marginTop: "30px",
              padding: "14px 28px",
              fontSize: "18px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#4CAF50",
              color: "white",
              boxShadow: "0 5px 12px rgba(0,0,0,0.4)",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
          >
            Restart Dashboard
          </button>
        )}
      </div>
    </div>
  );
}

export default EndPage;
