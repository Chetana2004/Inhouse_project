import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./OrdersInvoice.css";

const OrdersInvoice = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://inhouse-project-3.onrender.com/order/get"
        );

        // Additional client-side filtering
        const validOrders = response.data.filter((order) => {
          // Validate order number format
          if (!order.orderNumber || !/^ORD-\d{4}$/.test(order.orderNumber)) {
            return false;
          }

          // Validate required fields
          if (!order.customer || !order.date || !order.total) {
            return false;
          }

          // Validate date format (YYYY-MM-DD)
          if (!/^\d{4}-\d{2}-\d{2}$/.test(order.date)) {
            return false;
          }

          return true;
        });

        setOrders(validOrders);
      } catch (err) {
        setError("Failed to fetch orders");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.customer &&
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateNew = () => {
    navigate("/create-order");
  };

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1 className="title">Order Management</h1>
          <button className="create-btn" onClick={handleCreateNew}>
            + Create New Order
          </button>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Order #</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="loading-cell">
                  Loading orders...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="6" className="error-cell">
                  {error}
                </td>
              </tr>
            ) : filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.orderNumber}>
                  <td>{order.orderNumber}</td>
                  <td>{order.date}</td>
                  <td>{order.customer || "-"}</td>
                  <td>₹{order.total?.toFixed(2) || "0.00"}</td>
                  <td>
                    <span
                      className={`status ${order.status
                        ?.toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {order.status || "To Invoice"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="action-btn view-btn"
                      onClick={() => navigate(`/orders/${order.orderNumber}`)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-orders">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersInvoice;
