// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./OrdersInvoice.css";

// const OrdersInvoice = ({ orders, setOrders }) => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredOrders = orders.filter(
//     (order) =>
//       order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.customer.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleCreateNew = () => {
//     navigate("/create-order");
//   };

//   const getStatusClass = (status) => {
//     switch (status) {
//       case "To Invoice":
//         return "to-invoice";
//       case "Invoiced":
//         return "invoiced";
//       case "Paid":
//         return "paid";
//       default:
//         return "";
//     }
//   };

//   return (
//     <div className="container">
//       <div className="card">
//         <div className="header">
//           <h2 className="title">Orders to Invoice</h2>
//           <button className="create-btn" onClick={handleCreateNew}>
//             + Create New Order
//           </button>
//         </div>

//         <div className="search-box">
//           <input
//             type="text"
//             placeholder="Search orders..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <table>
//           <thead>
//             <tr>
//               <th>Order Number</th>
//               <th>Order Date</th>
//               <th>Customer Name</th>
//               <th>Salesperson</th>
//               <th>Total Amount</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredOrders.map((order, index) => (
//               <tr key={index}>
//                 <td>{order.orderNumber}</td>
//                 <td>{order.date}</td>
//                 <td>{order.customer}</td>
//                 <td>{order.salesperson}</td>
//                 <td>₹{order.total.toFixed(2)}</td>
//                 <td>
//                   <span className={`status ${getStatusClass(order.status)}`}>
//                     {order.status}
//                   </span>
//                 </td>
//                 <td>
//                   <button
//                     className="action-btn view-btn"
//                     onClick={() => navigate(`/orders/${order.orderNumber}`)}
//                   >
//                     View
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default OrdersInvoice;







import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrdersInvoice.css"; 

const OrdersInvoice = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/order/get")
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch orders");
        setLoading(false);
      });
  }, []);

  // Filter orders based on search term
  const filteredOrders = orders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Status badge styling
  const getStatusClass = (status) => {
    switch (status) {
      case "To Invoice":
        return styles.statusToInvoice;
      case "Invoiced":
        return styles.statusInvoiced;
      case "Paid":
        return styles.statusPaid;
      default:
        return "";
    }
  };

  if (loading) return <div className={styles.loading}>Loading orders...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Order Management</h1>
        <input
          type="text"
          placeholder="Search orders..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.orderTable}>
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
            {filteredOrders.map((order) => (
              <tr key={order.orderNumber}>
                <td>{order.orderNumber}</td>
                <td>{order.date}</td>
                <td>{order.customer}</td>
                <td>₹{order.total.toFixed(2)}</td>
                <td>
                  <span className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <button className={styles.viewButton}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersInvoice;