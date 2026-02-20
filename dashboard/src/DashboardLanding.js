import React from "react";
import landingBg from "./assets/landing-bg.jpg";

function DashboardLanding() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        backgroundImage: `url(${landingBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        textAlign: "center",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <h1>Welcome to AI Inventory Management</h1>
      <p>Click the buttons on the left to begin managing your inventory.</p>
    </div>
  );
}

export default DashboardLanding;