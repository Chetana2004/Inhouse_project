import React from 'react';
import { FiAlertTriangle, FiClock, FiPackage, FiTruck, FiCheckCircle } from 'react-icons/fi';
import './ProductionDashboard.css';
import TopNavbar from './TopNavbar';

const ProductionDashboard = () => {
  // Sample production data
  const productionStats = [
    { title: "Today's Output", value: "1,248", unit: "units", trend: "up", change: "12%", icon: <FiPackage /> },
    { title: "OEE", value: "78.5", unit: "%", trend: "up", change: "2.3%", icon: <FiCheckCircle /> },
    { title: "Avg Cycle Time", value: "4.2", unit: "min", trend: "down", change: "0.8%", icon: <FiClock /> },
    { title: "On-Time Delivery", value: "94.7", unit: "%", trend: "steady", change: "0%", icon: <FiTruck /> }
  ];

  const alerts = [
    { id: 1, severity: "high", message: "Machine #4 requires maintenance", time: "10 min ago", icon: <FiAlertTriangle /> },
    { id: 2, severity: "medium", message: "Material stock low for Component B", time: "45 min ago", icon: <FiAlertTriangle /> },
    { id: 3, severity: "low", message: "Quality check needed for Batch #221", time: "2 hours ago", icon: <FiAlertTriangle /> }
  ];

  const recentOrders = [
    { id: "#ORD-1001", customer: "Acme Corp", status: "In Production", progress: 75, due: "Today" },
    { id: "#ORD-1002", customer: "Globex Inc", status: "Scheduled", progress: 10, due: "Tomorrow" },
    { id: "#ORD-1003", customer: "Wayne Ent", status: "Completed", progress: 100, due: "Yesterday" },
    { id: "#ORD-1004", customer: "Stark Ind", status: "Delayed", progress: 45, due: "Overdue" }
  ];

  return (
    <>
    <TopNavbar/>
    <div className="production-dashboard">
      <div className="dashboard-header">
        <h1>Production Dashboard</h1>
        <div className="time-display">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        {productionStats.map((stat, index) => (
          <div key={index} className={`metric-card ${stat.trend}`}>
            <div className="metric-icon">{stat.icon}</div>
            <div className="metric-content">
              <h3>{stat.title}</h3>
              <div className="metric-value">
                <span className="value">{stat.value}</span>
                <span className="unit">{stat.unit}</span>
              </div>
              <div className="metric-trend">
                <span className={`trend ${stat.trend}`}>
                  {stat.change} {stat.trend === 'up' ? '↑' : stat.trend === 'down' ? '↓' : '→'}
                </span>
                <span className="trend-label">vs yesterday</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alerts and Recent Orders */}
      <div className="content-row">
        {/* Alerts Section */}
        <div className="alerts-section">
          <div className="section-header">
            <h2>Production Alerts</h2>
            <span className="badge">{alerts.length} Active</span>
          </div>
          <div className="alerts-list">
            {alerts.map(alert => (
              <div key={alert.id} className={`alert-item ${alert.severity}`}>
                <div className="alert-icon">{alert.icon}</div>
                <div className="alert-content">
                  <p className="alert-message">{alert.message}</p>
                  <p className="alert-time">{alert.time}</p>
                </div>
                <button className="alert-action">View</button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="orders-section">
          <div className="section-header">
            <h2>Recent Orders</h2>
            <button className="btn-text">View All</button>
          </div>
          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>
                      <span className={`status-badge ${order.status.toLowerCase().replace(' ', '-')}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <div className="progress-bar">
                        <div 
                          className={`progress-fill ${order.progress === 100 ? 'complete' : ''}`}
                          style={{ width: `${order.progress}%` }}
                        ></div>
                        <span className="progress-text">{order.progress}%</span>
                      </div>
                    </td>
                    <td className={order.due === "Overdue" ? "overdue" : ""}>{order.due}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Production Chart (Placeholder) */}
      <div className="chart-section">
        <div className="section-header">
          <h2>Production Output (Last 7 Days)</h2>
          <div className="chart-legend">
            <span className="legend-item"><span className="color-target"></span> Target</span>
            <span className="legend-item"><span className="color-actual"></span> Actual</span>
          </div>
        </div>
        <div className="chart-placeholder">
          <div className="chart-mock">
            <div className="chart-grid">
              {[0, 1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="chart-bar-container">
                  <div className="chart-bar target" style={{ height: `${70 + (i * 5)}px` }}></div>
                  <div className="chart-bar actual" style={{ height: `${60 + (i * 10)}px` }}></div>
                  <div className="chart-label">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductionDashboard;