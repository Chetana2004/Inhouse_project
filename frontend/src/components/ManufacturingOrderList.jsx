import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import './ManufacturingOrderList.css';
import './TopNavbar';
import TopNavbar from './TopNavbar';

const ManufacturingOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:8000/manufacturing-order/list');
        setOrders(res.data.data || res.data);
      } catch (err) {
        setError('Error fetching orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchSearch = (order.orderNumber || '').toLowerCase().includes(searchTerm.toLowerCase())
      || (order.productName || '').toLowerCase().includes(searchTerm.toLowerCase())
      || (order.productCode || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'planned': return 'status-badge-planned';
      case 'in-progress': return 'status-badge-in-progress';
      case 'completed': return 'status-badge-completed';
      case 'cancelled': return 'status-badge-cancelled';
      default: return '';
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <>
      <TopNavbar />
      <div className="manufacturing-order-list">
        <h2>Manufacturing Orders</h2>

        <div className="list-controls">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="all">All</option>
            <option value="planned">Planned</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="order-table-container">
          {filteredOrders.length > 0 ? (
            <table className="order-table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Start</th>
                  <th>Due</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order._id || order.id}>
                    <td>{order.orderNumber}</td>
                    <td>{order.productName} ({order.productCode})</td>
                    <td>{order.quantity}</td>
                    <td>{format(new Date(order.startDate), 'MMM dd, yyyy')}</td>
                    <td>{format(new Date(order.dueDate), 'MMM dd, yyyy')}</td>
                    <td>
                      <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-orders">No manufacturing orders found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ManufacturingOrderList;
