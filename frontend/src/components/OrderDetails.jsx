// Code is working !!

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./OrderDetails.css";

const OrderDetails = () => {
  const { orderNumber } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `https://inhouse-project-3.onrender.com/order/get/${encodeURIComponent(
            orderNumber
          )}`
        );
        console.log("API Response:", response.data); // Debug log

        if (response.data && response.data.orderNumber) {
          setOrder(response.data);
        } else {
          console.error("Order data is empty or invalid");
          setOrder(null);
        }
      } catch (err) {
        console.error("API Error:", err.response?.data || err.message);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderNumber]);

  if (loading) return <div className="order-details">Loading order...</div>;
  if (!order) return <div className="order-details">Order not found.</div>;

  return (
    <div className="order-details">
      <h2>Order Details - {order.orderNumber}</h2>
      <p>
        <strong>Date:</strong> {order.date}
      </p>
      <p>
        <strong>Customer:</strong> {order.customer}
      </p>
      <p>
        <strong>Salesperson:</strong> {order.salesperson}
      </p>
      <p>
        <strong>Status:</strong> {order.status}
      </p>
      <p>
        <strong>Notes:</strong> {order.notes || "None"}
      </p>

      <h3>Products</h3>
      <table className="products-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>₹{product.unitPrice.toFixed(2)}</td>
              <td>₹{product.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="totals">
        <p>
          <strong>Subtotal:</strong> ₹{order.subtotal.toFixed(2)}
        </p>
        <p>
          <strong>Tax:</strong> ₹{order.tax.toFixed(2)}
        </p>
        <p>
          <strong>Total:</strong> ₹{order.total.toFixed(2)}
        </p>
      </div>

      <button className="back-btn" onClick={() => navigate("/orders")}>
        ← Back to Orders
      </button>
    </div>
  );
};

export default OrderDetails;
