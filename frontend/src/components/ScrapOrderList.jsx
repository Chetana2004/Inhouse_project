import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ScrapOrderList.css";

const ScrapOrderList = () => {
  const [scrapOrders, setScrapOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/manufacturing-order/list")
      .then((res) => {
        const filtered = res.data.filter(
          (order) => order.status === "Scrapped"
        );
        setScrapOrders(filtered);
      })
      .catch((err) => console.error("Error fetching scrap orders:", err));
  }, []);

  return (
    <div className="scrap-orders-container">
      <h2>Scrap Orders List</h2>
      <table className="scrap-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Reason</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {scrapOrders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.product}</td>
              <td>{order.quantity}</td>
              <td>{order.scrapDetails?.reason}</td>
              <td>{order.scrapDetails?.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScrapOrderList;
