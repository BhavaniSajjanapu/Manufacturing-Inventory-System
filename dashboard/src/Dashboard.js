import React, { useState } from "react";

// Components
import Sidebar from "./Sidebar";
import DashboardLanding from "./DashboardLanding";
import Summary from "./Summary";
import AddItem from "./AddItem";
import InventoryTable from "./InventoryTable";
import Forecast from "./Forecast";
import EndPage from "./EndPage";

function Dashboard() {
  const [activePage, setActivePage] = useState(""); // "" = Landing page

  const contentStyle = {
    flex: 1,
    padding: "30px",
    minHeight: "100vh",
    backgroundColor: "#f4f6f9",
    overflowY: "auto",
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar setActivePage={setActivePage} />

      {/* Main content */}
      <div style={contentStyle}>
        {activePage === "" && <DashboardLanding />}
        {activePage === "summary" && <Summary />}
        {activePage === "add" && <AddItem />}
        {activePage === "inventory" && <InventoryTable />}
        {activePage === "forecast" && <Forecast />}
        {activePage === "end" && (
          <EndPage onRestart={() => setActivePage("")} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;