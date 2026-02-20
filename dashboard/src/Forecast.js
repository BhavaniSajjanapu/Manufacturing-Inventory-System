// src/Forecast.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function Forecast() {
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  const aiApi = "http://127.0.0.1:8001"; // ML service URL

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const res = await axios.get(`${aiApi}/ml_forecast`);
        setForecast(res.data);
      } catch (err) {
        console.error("Error fetching forecast:", err);
        setError("Failed to fetch forecast. Check backend service.");
      }
    };

    fetchForecast();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>ML Forecast</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {forecast.length === 0 && !error && <p>Loading forecast data...</p>}
      {forecast.length > 0 && (
        <table width="100%" cellPadding="10" style={{ borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#e3eafc" }}>
            <tr>
              <th>Item Name</th>
              <th>Forecast Quantity</th>
              <th>Reorder Recommendation</th>
            </tr>
          </thead>
          <tbody>
            {forecast.map((item, index) => (
              <tr key={index}>
                <td>{item.item_name}</td>
                <td>{item.forecast_quantity}</td>
                <td>{item.reorder_recommendation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Forecast;