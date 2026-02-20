// src/Summary.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Summary() {
  const [summary, setSummary] = useState({});
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState(""); // To display network errors

  const inventoryApi = "http://127.0.0.1:8000"; // Update if using Docker / hosted backend

  useEffect(() => {
    // Fetch summary data
    const fetchSummary = async () => {
      try {
        const res = await axios.get(`${inventoryApi}/summary`);
        setSummary(res.data);
      } catch (err) {
        console.error("Error fetching summary:", err);
        setError("Failed to fetch summary. Please check your backend.");
      }
    };

    // Fetch inventory items
    const fetchInventory = async () => {
      try {
        const res = await axios.get(`${inventoryApi}/items`);
        setInventory(res.data);
      } catch (err) {
        console.error("Error fetching inventory:", err);
        setError("Failed to fetch inventory. Please check your backend.");
      }
    };

    fetchSummary();
    fetchInventory();
  }, []); // Empty dependency array is fine now

  // Prepare chart data
  const chartData = {
    labels: inventory.map((item) => item.item_name),
    datasets: [
      {
        label: "Quantity in Stock",
        data: inventory.map((item) => item.quantity_in_stock),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Reorder Level",
        data: inventory.map((item) => item.reorder_level),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Inventory Overview" },
    },
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Inventory Summary</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        <strong>Total Items:</strong> {summary.total_items || 0}
      </p>
      <p>
        <strong>Total Quantity:</strong> {summary.total_quantity || 0}
      </p>
      <p>
        <strong>Low Stock Items:</strong> {summary.low_stock_items || 0}
      </p>

      {/* Inventory Bar Chart */}
      <div style={{ marginTop: "40px" }}>
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Inventory Table */}
      <div style={{ marginTop: "40px" }}>
        <h3>Inventory Table</h3>
        <table width="100%" cellPadding="10" style={{ borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#e3eafc" }}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Stock</th>
              <th>Reorder</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.item_name}</td>
                <td>{item.quantity_in_stock}</td>
                <td>{item.reorder_level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Summary;