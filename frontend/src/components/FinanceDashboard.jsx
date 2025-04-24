// import React, { useState } from 'react';
// import { 
//   FiDollarSign, FiTrendingUp, FiTrendingDown, FiPieChart, 
//   FiCreditCard, FiCalendar, FiRefreshCw, FiDownload,
//   FiFilter, FiSearch, FiPlus, FiPrinter, FiBarChart2
// } from 'react-icons/fi';
// import './FinanceDashboard.css';

// const FinanceDashboard = () => {
//   // Financial data state
//   const [financialMetrics] = useState({
//     revenue: '$1,248,750',
//     expenses: '$842,900',
//     profit: '$405,850',
//     profitMargin: '32.5%',
//     accountsReceivable: '$328,420',
//     accountsPayable: '$215,670'
//   });

//   const [transactions] = useState([
//     { id: 'TRX-1001', date: '2023-06-15', description: 'Conveyor System Sale', amount: '$42,500', type: 'revenue', status: 'completed' },
//     { id: 'TRX-1002', date: '2023-06-14', description: 'Steel Frame Purchase', amount: '$28,750', type: 'expense', status: 'completed' },
//     { id: 'TRX-1003', date: '2023-06-13', description: 'Maintenance Parts', amount: '$6,520', type: 'expense', status: 'pending' },
//     { id: 'TRX-1004', date: '2023-06-12', description: 'Belt Component Sale', amount: '$37,800', type: 'revenue', status: 'completed' },
//     { id: 'TRX-1005', date: '2023-06-11', description: 'Electrical Components', amount: '$12,450', type: 'expense', status: 'completed' },
//   ]);

//   const [invoices] = useState([
//     { id: 'INV-2301', client: 'ABC Manufacturing', amount: '$42,500', dueDate: '2023-06-30', status: 'unpaid' },
//     { id: 'INV-2302', client: 'XYZ Industries', amount: '$28,750', dueDate: '2023-07-05', status: 'unpaid' },
//     { id: 'INV-2303', client: 'Global Conveyors', amount: '$65,200', dueDate: '2023-06-25', status: 'paid' },
//     { id: 'INV-2304', client: 'Bulk Material Co', amount: '$37,800', dueDate: '2023-07-10', status: 'unpaid' },
//   ]);

//   const [activeTab, setActiveTab] = useState('overview');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [timePeriod, setTimePeriod] = useState('month');

//   // Filter transactions
//   const filteredTransactions = transactions.filter(transaction => 
//     transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
//     transaction.id.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Format date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       year: 'numeric', 
//       month: 'short', 
//       day: 'numeric' 
//     });
//   };

//   return (
//     <div className="finance-dashboard">
//       {/* Main Header */}
//       <header className="dashboard-header">
//         <div className="header-title">
//           <FiDollarSign className="header-icon" />
//           <h1>Finance Dashboard</h1>
//           <span className="last-updated">Last updated: {new Date().toLocaleTimeString()}</span>
//         </div>
        
//         <div className="header-controls">
//           <div className="time-period-selector">
//             <select 
//               value={timePeriod} 
//               onChange={(e) => setTimePeriod(e.target.value)}
//               className="period-select"
//             >
//               <option value="week">This Week</option>
//               <option value="month">This Month</option>
//               <option value="quarter">This Quarter</option>
//               <option value="year">This Year</option>
//             </select>
//           </div>
          
//           <div className="search-container">
//             <FiSearch className="search-icon" />
//             <input 
//               type="text" 
//               placeholder="Search transactions..." 
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="search-input"
//             />
//           </div>
          
//           <div className="action-buttons">
//             <button className="btn primary">
//               <FiPlus />
//               <span>New Transaction</span>
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Dashboard Content */}
//       <div className="dashboard-container">
//         {/* Navigation Sidebar */}
//         <nav className="sidebar">
//           <div className="sidebar-section">
//             <h3 className="sidebar-title">Finance Views</h3>
//             <ul className="nav-menu">
//               <li 
//                 className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('overview')}
//               >
//                 <span className="nav-icon"><FiPieChart /></span>
//                 <span className="nav-text">Overview</span>
//               </li>
//               <li 
//                 className={`nav-item ${activeTab === 'transactions' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('transactions')}
//               >
//                 <span className="nav-icon"><FiCreditCard /></span>
//                 <span className="nav-text">Transactions</span>
//               </li>
//               <li 
//                 className={`nav-item ${activeTab === 'invoices' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('invoices')}
//               >
//                 <span className="nav-icon"><FiDollarSign /></span>
//                 <span className="nav-text">Invoices</span>
//               </li>
//               <li 
//                 className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('reports')}
//               >
//                 <span className="nav-icon"><FiBarChart2 /></span>
//                 <span className="nav-text">Reports</span>
//               </li>
//             </ul>
//           </div>
          
//           <div className="sidebar-section">
//             <h3 className="sidebar-title">Quick Actions</h3>
//             <div className="quick-actions">
//               <button className="btn secondary">
//                 <FiDownload />
//                 <span>Export Data</span>
//               </button>
//               <button className="btn secondary">
//                 <FiPrinter />
//                 <span>Print Reports</span>
//               </button>
//             </div>
//           </div>
//         </nav>

//         {/* Main Content Area */}
//         <main className="main-content">
//           {/* Overview Tab */}
//           {activeTab === 'overview' && (
//             <div className="tab-content">
//               <div className="metrics-container">
//                 <div className="metrics-grid">
//                   <MetricCard 
//                     title="Revenue" 
//                     value={financialMetrics.revenue} 
//                     icon={<FiTrendingUp />}
//                     trend="up"
//                     change="+12.5% from last month"
//                   />
//                   <MetricCard 
//                     title="Expenses" 
//                     value={financialMetrics.expenses} 
//                     icon={<FiTrendingDown />}
//                     trend="down"
//                     change="-3.2% from last month"
//                   />
//                   <MetricCard 
//                     title="Net Profit" 
//                     value={financialMetrics.profit} 
//                     icon={<FiDollarSign />}
//                     trend="up"
//                     change="+18.7% from last month"
//                     variant="success"
//                   />
//                   <MetricCard 
//                     title="Profit Margin" 
//                     value={financialMetrics.profitMargin} 
//                     icon={<FiPieChart />}
//                     trend="up"
//                     change="+2.4% from last month"
//                   />
//                   <MetricCard 
//                     title="Accounts Receivable" 
//                     value={financialMetrics.accountsReceivable} 
//                     icon={<FiTrendingUp />}
//                     trend="up"
//                     change="+8.3% from last month"
//                     variant="warning"
//                   />
//                   <MetricCard 
//                     title="Accounts Payable" 
//                     value={financialMetrics.accountsPayable} 
//                     icon={<FiTrendingDown />}
//                     trend="down"
//                     change="-5.1% from last month"
//                     variant="danger"
//                   />
//                 </div>
//               </div>

//               <div className="content-section">
//                 <div className="section-header">
//                   <h2>Recent Transactions</h2>
//                   <div className="section-actions">
//                     <button className="btn secondary">
//                       <FiRefreshCw />
//                       <span>Refresh</span>
//                     </button>
//                     <button className="btn tertiary">
//                       <FiDownload />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="card">
//                   <div className="table-responsive">
//                     <table className="finance-table">
//                       <thead>
//                         <tr>
//                           <th>Transaction ID</th>
//                           <th>Date</th>
//                           <th>Description</th>
//                           <th>Amount</th>
//                           <th>Type</th>
//                           <th>Status</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {transactions.map(transaction => (
//                           <tr key={transaction.id}>
//                             <td>{transaction.id}</td>
//                             <td>{formatDate(transaction.date)}</td>
//                             <td>{transaction.description}</td>
//                             <td className={`amount ${transaction.type}`}>
//                               {transaction.type === 'expense' ? '-' : ''}{transaction.amount}
//                             </td>
//                             <td>
//                               <span className={`type-badge ${transaction.type}`}>
//                                 {transaction.type}
//                               </span>
//                             </td>
//                             <td>
//                               <span className={`status-badge ${transaction.status}`}>
//                                 {transaction.status}
//                               </span>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Transactions Tab */}
//           {activeTab === 'transactions' && (
//             <div className="tab-content">
//               <div className="content-section">
//                 <div className="section-header">
//                   <h2>All Transactions</h2>
//                   <div className="section-actions">
//                     <div className="filter-group">
//                       <FiFilter className="filter-icon" />
//                       <select className="filter-select">
//                         <option>All Types</option>
//                         <option>Revenue</option>
//                         <option>Expense</option>
//                       </select>
//                     </div>
//                     <button className="btn primary">
//                       <FiPlus />
//                       <span>Add Transaction</span>
//                     </button>
//                   </div>
//                 </div>
//                 <div className="card">
//                   <div className="table-responsive">
//                     <table className="finance-table">
//                       <thead>
//                         <tr>
//                           <th>ID</th>
//                           <th>Date</th>
//                           <th>Description</th>
//                           <th>Amount</th>
//                           <th>Type</th>
//                           <th>Status</th>
//                           <th>Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {filteredTransactions.map(transaction => (
//                           <tr key={transaction.id}>
//                             <td>{transaction.id}</td>
//                             <td>{formatDate(transaction.date)}</td>
//                             <td>{transaction.description}</td>
//                             <td className={`amount ${transaction.type}`}>
//                               {transaction.type === 'expense' ? '-' : ''}{transaction.amount}
//                             </td>
//                             <td>
//                               <span className={`type-badge ${transaction.type}`}>
//                                 {transaction.type}
//                               </span>
//                             </td>
//                             <td>
//                               <span className={`status-badge ${transaction.status}`}>
//                                 {transaction.status}
//                               </span>
//                             </td>
//                             <td>
//                               <button className="btn-icon" title="View">
//                                 <FiDollarSign />
//                               </button>
//                               <button className="btn-icon" title="Edit">
//                                 <FiTrendingUp />
//                               </button>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Invoices Tab */}
//           {activeTab === 'invoices' && (
//             <div className="tab-content">
//               <div className="content-section">
//                 <div className="section-header">
//                   <h2>Invoices</h2>
//                   <div className="section-actions">
//                     <button className="btn primary">
//                       <FiPlus />
//                       <span>Create Invoice</span>
//                     </button>
//                     <button className="btn secondary">
//                       <FiDownload />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="card">
//                   <div className="table-responsive">
//                     <table className="finance-table">
//                       <thead>
//                         <tr>
//                           <th>Invoice ID</th>
//                           <th>Client</th>
//                           <th>Amount</th>
//                           <th>Due Date</th>
//                           <th>Status</th>
//                           <th>Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {invoices.map(invoice => (
//                           <tr key={invoice.id}>
//                             <td>{invoice.id}</td>
//                             <td>{invoice.client}</td>
//                             <td className="amount">{invoice.amount}</td>
//                             <td>{formatDate(invoice.dueDate)}</td>
//                             <td>
//                               <span className={`status-badge ${invoice.status}`}>
//                                 {invoice.status}
//                               </span>
//                             </td>
//                             <td>
//                               <button className="btn small">View</button>
//                               {invoice.status === 'unpaid' && (
//                                 <button className="btn small primary">Send Reminder</button>
//                               )}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Reports Tab */}
//           {activeTab === 'reports' && (
//             <div className="tab-content">
//               <div className="content-section">
//                 <div className="section-header">
//                   <h2>Financial Reports</h2>
//                   <div className="section-actions">
//                     <button className="btn secondary">
//                       <FiRefreshCw />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="reports-grid">
//                   <ReportCard 
//                     title="Profit & Loss Statement" 
//                     description="Summary of revenues, costs and expenses"
//                     icon={<FiBarChart2 />}
//                   />
//                   <ReportCard 
//                     title="Balance Sheet" 
//                     description="Snapshot of company's financial position"
//                     icon={<FiDollarSign />}
//                   />
//                   <ReportCard 
//                     title="Cash Flow Statement" 
//                     description="Tracking cash inflows and outflows"
//                     icon={<FiTrendingUp />}
//                   />
//                   <ReportCard 
//                     title="Accounts Receivable Aging" 
//                     description="Summary of outstanding customer balances"
//                     icon={<FiCreditCard />}
//                   />
//                 </div>
//               </div>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// // Metric Card Component
// const MetricCard = ({ title, value, icon, trend, change, variant }) => {
//   return (
//     <div className={`metric-card ${variant || ''}`}>
//       <div className="metric-icon">{icon}</div>
//       <div className="metric-content">
//         <h3>{title}</h3>
//         <p className="metric-value">{value}</p>
//         <div className={`metric-trend ${trend}`}>
//           <span>{change}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Report Card Component
// const ReportCard = ({ title, description, icon }) => {
//   return (
//     <div className="report-card">
//       <div className="report-icon">{icon}</div>
//       <div className="report-content">
//         <h3>{title}</h3>
//         <p>{description}</p>
//       </div>
//       <div className="report-actions">
//         <button className="btn secondary">
//           <FiPrinter />
//           <span>Print</span>
//         </button>
//         <button className="btn primary">
//           <FiDownload />
//           <span>Export</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FinanceDashboard;









// New Finance Dashboard

import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './FinanceDashboard.css';

ChartJS.register(
  CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend
);

const FinanceDashboard = () => {
  // Color palette
  const colors = {
    navy: '#0a1a2f',      // Dark navy for navbar
    primary: '#2563eb',   // Primary blue
    success: '#16a34a',   // Green
    warning: '#ea580c',   // Orange
    danger: '#dc2626',    // Red
    text: '#1f2937',      // Dark gray for text
    lightText: '#6b7280'  // Light gray for secondary text
  };

  // Revenue by product line data
  const revenueData = {
    labels: ['Belt Systems', 'Roller Systems', 'Overhead', 'Custom Solutions', 'Maintenance'],
    datasets: [{
      label: 'Revenue ($)',
      data: [1850000, 1250000, 950000, 750000, 500000],
      backgroundColor: colors.primary,
      borderRadius: 4
    }]
  };

  // Quarterly performance data
  const quarterlyData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Revenue',
        data: [1200000, 1350000, 1420000, 1550000],
        borderColor: colors.primary,
        backgroundColor: 'transparent',
        tension: 0.3,
        borderWidth: 3
      },
      {
        label: 'Production Cost',
        data: [950000, 1050000, 1120000, 1200000],
        borderColor: colors.warning,
        backgroundColor: 'transparent',
        tension: 0.3,
        borderWidth: 3
      }
    ]
  };

  // KPI cards data
  const kpiCards = [
    { 
      title: 'Annual Revenue', 
      value: '$5.42M', 
      change: '+14.2%', 
      trend: 'up',
      icon: '📊'
    },
    { 
      title: 'Gross Margin', 
      value: '22.4%', 
      change: '+2.1%', 
      trend: 'up',
      icon: '💹'
    },
    { 
      title: 'Orders Booked', 
      value: '156', 
      change: '+18%', 
      trend: 'up',
      icon: '📝'
    },
    { 
      title: 'Avg. Order Value', 
      value: '$34,743', 
      change: '+5.3%', 
      trend: 'up',
      icon: '💰'
    }
  ];

  // Recent projects data
  const recentProjects = [
    { 
      id: 'CV-2023-078', 
      client: 'Automotive Corp', 
      value: '$245,000', 
      status: 'Installation',
      progress: 85
    },
    { 
      id: 'CV-2023-079', 
      client: 'Food Processing Inc', 
      value: '$187,500', 
      status: 'Fabrication',
      progress: 60
    },
    { 
      id: 'CV-2023-080', 
      client: 'Mining Group', 
      value: '$320,000', 
      status: 'Design',
      progress: 30
    },
    { 
      id: 'CV-2023-081', 
      client: 'E-Commerce Fulfillment', 
      value: '$275,000', 
      status: 'Shipping',
      progress: 95
    }
  ];

  return (
    <div className="dashboard">
      {/* Top Navigation - Dark Navy Blue */}
      <nav className="dashboard-nav" style={{ backgroundColor: colors.navy }}>
        <div className="nav-brand">
          <span className="nav-icon" style={{ color: 'white' }}>⚙️</span>
          <h1 style={{ color: 'white' }}>Conveyor Systems Financial Dashboard</h1>
        </div>
        <div className="nav-period" style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}>
          2023 Annual Report
        </div>
      </nav>

      {/* Main Content - White Theme */}
      <main className="dashboard-main" style={{ backgroundColor: '#fff', color: colors.text }}>
        {/* KPI Cards */}
        <section className="kpi-grid">
          {kpiCards.map((card, index) => (
            <div 
              key={index} 
              className="kpi-card" 
              style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}
            >
              <div className="kpi-icon" style={{ color: colors.primary }}>{card.icon}</div>
              <div className="kpi-content">
                <h3 style={{ color: colors.lightText }}>{card.title}</h3>
                <h2 style={{ color: colors.text }}>{card.value}</h2>
                <p 
                  className={`kpi-trend ${card.trend}`} 
                  style={{ color: card.trend === 'up' ? colors.success : colors.danger }}
                >
                  {card.change} {card.trend === 'up' ? '↑' : '↓'}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Charts Section */}
        <section className="charts-container">
          <div 
            className="chart-card" 
            style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
          >
            <h3 style={{ color: colors.text }}>Revenue by Product Line</h3>
            <div className="chart-wrapper">
              <Bar 
                data={revenueData} 
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    y: {
                      ticks: { color: colors.lightText },
                      grid: { color: '#e5e7eb' }
                    },
                    x: {
                      ticks: { color: colors.lightText }
                    }
                  }
                }}
              />
            </div>
          </div>

          <div 
            className="chart-card" 
            style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
          >
            <h3 style={{ color: colors.text }}>Quarterly Performance</h3>
            <div className="chart-wrapper">
              <Line 
                data={quarterlyData} 
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      labels: { color: colors.text }
                    }
                  },
                  scales: {
                    y: {
                      ticks: { color: colors.lightText },
                      grid: { color: '#e5e7eb' }
                    },
                    x: {
                      ticks: { color: colors.lightText }
                    }
                  }
                }}
              />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section 
          className="projects-section" 
          style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
        >
          <h3 style={{ color: colors.text }}>Active Projects</h3>
          <div className="projects-table">
            <table>
              <thead>
                <tr>
                  <th style={{ color: colors.lightText }}>Project ID</th>
                  <th style={{ color: colors.lightText }}>Client</th>
                  <th style={{ color: colors.lightText }}>Value</th>
                  <th style={{ color: colors.lightText }}>Status</th>
                  <th style={{ color: colors.lightText }}>Progress</th>
                </tr>
              </thead>
              <tbody>
                {recentProjects.map((project, index) => (
                  <tr key={index}>
                    <td style={{ color: colors.text }}>{project.id}</td>
                    <td style={{ color: colors.text }}>{project.client}</td>
                    <td style={{ color: colors.text }}>{project.value}</td>
                    <td>
                      <span 
                        className="status-badge" 
                        style={{ 
                          backgroundColor: getStatusBackground(project.status),
                          color: getStatusTextColor(project.status)
                        }}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ 
                            width: `${project.progress}%`,
                            backgroundColor: colors.primary
                          }}
                        ></div>
                        <span style={{ color: colors.lightText }}>{project.progress}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

// Helper functions for status colors
function getStatusBackground(status) {
  const statusColors = {
    'Design': '#fef3c7',
    'Fabrication': '#fed7aa',
    'Installation': '#bfdbfe',
    'Shipping': '#bbf7d0'
  };
  return statusColors[status] || '#e5e7eb';
}

function getStatusTextColor(status) {
  const statusColors = {
    'Design': '#92400e',
    'Fabrication': '#9a3412',
    'Installation': '#1e40af',
    'Shipping': '#166534'
  };
  return statusColors[status] || '#1f2937';
}

export default FinanceDashboard;