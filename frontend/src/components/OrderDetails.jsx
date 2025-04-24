import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./OrderDetails.css";

const OrderDetails = ({ orders }) => {
  const { orderNumber } = useParams();
  const navigate = useNavigate();

  const order = orders.find((o) => o.orderNumber === orderNumber);

  if (!order) {
    return <div className="order-details">Order not found.</div>;
  }

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
        <strong>Payment Terms:</strong> {order.paymentTerms}
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
            <th>Product ID</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((product, index) => (
            <tr key={index}>
              <td>{product.id}</td>
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
          <strong>Discount:</strong> - ₹{order.discount.toFixed(2)}
        </p>
        <p>
          <strong>Tax:</strong> + ₹{order.tax.toFixed(2)}
        </p>
        <p className="grand-total">
          <strong>Total:</strong> ₹{order.total.toFixed(2)}
        </p>
      </div>

      <button onClick={() => navigate("/orders")} className="back-btn">
        ← Back to Orders
      </button>
    </div>
  );
};

export default OrderDetails;
