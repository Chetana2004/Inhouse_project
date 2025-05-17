import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SalesDashboard.css";
import axios from "axios";
import {
  FiDollarSign,
  FiFileText,
  FiUsers,
  FiShoppingCart,
  FiTrendingUp,
  FiActivity,
  FiClock,
  FiPlus,
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Navbar from "./Navbar";

const SalesDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  // Sample data - replace with actual API calls
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setDashboardData({
            revenue: 25345,
            orders: 1234,
            customers: 568,
            pendingQuotes: 12,
            recentActivities: [
              {
                id: 1,
                activity: "New order #5001 received",
                time: "10 mins ago",
              },
              {
                id: 2,
                activity: "Quotation QT-1002 sent to client",
                time: "25 mins ago",
              },
              {
                id: 3,
                activity: "Invoice INV-2023-05 paid",
                time: "1 hour ago",
              },
              {
                id: 4,
                activity: "New customer registered",
                time: "2 hours ago",
              },
            ],
            salesData: [
              { name: "Jan", sales: 4000 },
              { name: "Feb", sales: 3000 },
              { name: "Mar", sales: 5000 },
              { name: "Apr", sales: 2780 },
              { name: "May", sales: 1890 },
              { name: "Jun", sales: 2390 },
            ],
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      title: "Total Revenue",
      value: `$${dashboardData?.revenue?.toLocaleString() || "0"}`,
      icon: <FiDollarSign size={20} />,
      trend: "+12%",
      color: "var(--primary-color)",
      bgColor: "var(--primary-light)",
    },
    {
      title: "Total Orders",
      value: dashboardData?.orders?.toLocaleString() || "0",
      icon: <FiShoppingCart size={20} />,
      trend: "+5%",
      color: "var(--success-color)",
      bgColor: "var(--success-light)",
    },
    {
      title: "Total Customers",
      value: dashboardData?.customers?.toLocaleString() || "0",
      icon: <FiUsers size={20} />,
      trend: "+8%",
      color: "var(--info-color)",
      bgColor: "var(--info-light)",
    },
    {
      title: "Pending Quotations",
      value: dashboardData?.pendingQuotes?.toLocaleString() || "0",
      icon: <FiFileText size={20} />,
      trend: "-2%",
      color: "var(--warning-color)",
      bgColor: "var(--warning-light)",
    },
  ];

  const handleGenerateNew = () => navigate("/generate-quotation");
  const handleNewOrder = () => navigate("/create-order");
  const handleNewInvoice = () => navigate("/invoices");

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Sales Dashboard</h1>
          <div className="dashboard-actions">
            <button className="time-filter">
              <FiClock size={16} /> Last 30 days
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card"
              style={{ backgroundColor: stat.bgColor }}
            >
              <div className="stat-icon" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-content">
                <span className="stat-title">{stat.title}</span>
                <h3 className="stat-value">{stat.value}</h3>
                <div className="stat-trend" style={{ color: stat.color }}>
                  <FiTrendingUp size={14} /> {stat.trend}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="dashboard-content">
          {/* Sales Chart */}
          <div className="dashboard-card chart-card">
            <div className="card-header">
              <h2>Sales Performance</h2>
              <div className="chart-legend">
                <span className="legend-item">
                  <div
                    className="legend-color"
                    style={{ backgroundColor: "var(--primary-color)" }}
                  ></div>
                  Current Year
                </span>
              </div>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dashboardData?.salesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="sales"
                    fill="var(--primary-color)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="dashboard-card activities-card">
            <div className="card-header">
              <h2>Recent Activities</h2>
              <button className="view-all">View All</button>
            </div>
            <ul className="activity-list">
              {dashboardData?.recentActivities?.map((activity) => (
                <li key={activity.id} className="activity-item">
                  <div className="activity-dot"></div>
                  <div className="activity-content">
                    <p>{activity.activity}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card quick-actions-card">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-btn primary" onClick={handleGenerateNew}>
              <FiPlus size={18} /> Create Quotation
            </button>
            <button className="action-btn success" onClick={handleNewOrder}>
              <FiPlus size={18} /> New Order
            </button>
            <button className="action-btn info" onClick={handleNewInvoice}>
              <FiPlus size={18} /> Generate Invoice
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesDashboard;
