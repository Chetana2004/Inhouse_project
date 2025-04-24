// import React, { useState } from 'react';
// import { FiUsers, FiBriefcase, FiCalendar, FiPieChart, FiBell, FiSearch, FiPlus } from 'react-icons/fi';
// import './HRDashboard.css';

// const HRDashboard = () => {
//   // Sample data
//   const [employees, setEmployees] = useState([
//     { id: 1, name: 'John Smith', department: 'Production', position: 'Assembly Technician', status: 'Active', joinDate: '2021-03-15' },
//     { id: 2, name: 'Sarah Johnson', department: 'Engineering', position: 'Design Engineer', status: 'Active', joinDate: '2019-07-22' },
//     { id: 3, name: 'Mike Brown', department: 'Quality Control', position: 'Inspector', status: 'On Leave', joinDate: '2020-11-05' },
//     { id: 4, name: 'Lisa Wong', department: 'Production', position: 'Team Lead', status: 'Active', joinDate: '2018-05-30' },
//     { id: 5, name: 'David Wilson', department: 'Maintenance', position: 'Technician', status: 'Active', joinDate: '2022-01-10' },
//   ]);

//   const [metrics] = useState({
//     totalEmployees: 142,
//     newHires: 5,
//     onLeave: 8,
//     turnoverRate: '4.2%',
//     openPositions: 3,
//     trainingThisMonth: 4,
//   });

//   const [notifications] = useState([
//     { id: 1, message: '3 employees have birthdays this week', type: 'info', time: '2h ago' },
//     { id: 2, message: 'Time for quarterly performance reviews', type: 'warning', time: '1d ago' },
//     { id: 3, message: 'New job applications received (5)', type: 'success', time: '3h ago' },
//   ]);

//   const [recentActivities] = useState([
//     { id: 1, activity: 'New hire: Assembly Technician (Production)', time: 'Today, 10:30 AM' },
//     { id: 2, activity: 'Performance review completed for 12 employees', time: 'Yesterday, 3:45 PM' },
//     { id: 3, activity: 'Safety training scheduled for next week', time: 'Mar 28, 9:15 AM' },
//     { id: 4, activity: '3 job postings approved', time: 'Mar 27, 11:20 AM' },
//   ]);

//   const [activeTab, setActiveTab] = useState('overview');
//   const [searchQuery, setSearchQuery] = useState('');

//   const filteredEmployees = employees.filter(employee =>
//     employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     employee.position.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="hr-dashboard">
//       {/* Header */}
//       <header className="dashboard-header">
//         <div className="header-left">
//           <h1>HR Manager Dashboard</h1>
//           <p className="current-date">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
//         </div>
//         <div className="header-right">
//           <div className="notification-icon">
//             <FiBell size={20} />
//             <span className="badge">3</span>
//           </div>
//           <div className="user-info">
//             <div className="user-details">
//               <span className="user-name">HR Manager</span>
//               <span className="user-role">Administrator</span>
//             </div>
//             <div className="avatar">HM</div>
//           </div>
//         </div>
//       </header>

//       <div className="dashboard-content">
//         {/* Sidebar */}
//         <nav className="sidebar">
//           <div className="sidebar-header">
//             <h3>HR Management</h3>
//           </div>
//           <ul>
//             <li 
//               className={activeTab === 'overview' ? 'active' : ''} 
//               onClick={() => setActiveTab('overview')}
//             >
//               <FiPieChart className="icon" />
//               <span>Overview</span>
//             </li>
//             <li 
//               className={activeTab === 'employees' ? 'active' : ''} 
//               onClick={() => setActiveTab('employees')}
//             >
//               <FiUsers className="icon" />
//               <span>Employees</span>
//             </li>
//             <li 
//               className={activeTab === 'recruitment' ? 'active' : ''} 
//               onClick={() => setActiveTab('recruitment')}
//             >
//               <FiBriefcase className="icon" />
//               <span>Recruitment</span>
//             </li>
//             <li 
//               className={activeTab === 'attendance' ? 'active' : ''} 
//               onClick={() => setActiveTab('attendance')}
//             >
//               <FiCalendar className="icon" />
//               <span>Attendance</span>
//             </li>
//           </ul>
//         </nav>

//         {/* Main Content */}
//         <main className="main-content">
//           {activeTab === 'overview' && (
//             <>
//               {/* Metrics Cards */}
//               <div className="section-header">
//                 <h2>Key Metrics</h2>
//               </div>
//               <div className="metrics-grid">
//                 <MetricCard 
//                   title="Total Employees" 
//                   value={metrics.totalEmployees} 
//                   icon={<FiUsers size={24} />} 
//                   trend="up" 
//                   change="2% from last month" 
//                 />
//                 <MetricCard 
//                   title="New Hires (30d)" 
//                   value={metrics.newHires} 
//                   icon={<FiPlus size={24} />} 
//                   trend="up" 
//                   change="1 from last month" 
//                 />
//                 <MetricCard 
//                   title="On Leave" 
//                   value={metrics.onLeave} 
//                   icon={<FiCalendar size={24} />} 
//                   trend="down" 
//                   change="3 from last week" 
//                 />
//                 <MetricCard 
//                   title="Turnover Rate" 
//                   value={metrics.turnoverRate} 
//                   icon={<FiPieChart size={24} />} 
//                   trend="down" 
//                   change="0.8% from last quarter" 
//                 />
//               </div>

//               {/* Recent Activity and Notifications */}
//               <div className="dashboard-row">
//                 <div className="card recent-activity">
//                   <div className="card-header">
//                     <h2>Recent Activity</h2>
//                   </div>
//                   <ul>
//                     {recentActivities.map(activity => (
//                       <li key={activity.id}>
//                         <div className="activity-content">
//                           <p>{activity.activity}</p>
//                           <span className="activity-time">{activity.time}</span>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 <div className="card notifications">
//                   <div className="card-header">
//                     <h2>Notifications</h2>
//                     <span className="view-all">View All</span>
//                   </div>
//                   <ul>
//                     {notifications.map(notification => (
//                       <li key={notification.id} className={`notification ${notification.type}`}>
//                         <p>{notification.message}</p>
//                         <span className="notification-time">{notification.time}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>

//               {/* Quick Actions */}
//               <div className="section-header">
//                 <h2>Quick Actions</h2>
//               </div>
//               <div className="quick-actions-grid">
//                 <QuickAction 
//                   title="Add Employee" 
//                   icon={<FiUsers size={20} />} 
//                   color="primary" 
//                   onClick={() => console.log('Add Employee')} 
//                 />
//                 <QuickAction 
//                   title="Process Payroll" 
//                   icon={<FiBriefcase size={20} />} 
//                   color="secondary" 
//                   onClick={() => console.log('Process Payroll')} 
//                 />
//                 <QuickAction 
//                   title="Schedule Training" 
//                   icon={<FiCalendar size={20} />} 
//                   color="tertiary" 
//                   onClick={() => console.log('Schedule Training')} 
//                 />
//                 <QuickAction 
//                   title="Manage Leaves" 
//                   icon={<FiPieChart size={20} />} 
//                   color="warning" 
//                   onClick={() => console.log('Manage Leaves')} 
//                 />
//               </div>
//             </>
//           )}

//           {activeTab === 'employees' && (
//             <div className="card employee-list">
//               <div className="card-header">
//                 <h2>Employee Management</h2>
//                 <div className="header-actions">
//                   <div className="search-box">
//                     <FiSearch className="search-icon" />
//                     <input 
//                       type="text" 
//                       placeholder="Search employees..." 
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                     />
//                   </div>
//                   <button className="btn primary">
//                     <FiPlus size={16} />
//                     <span>Add Employee</span>
//                   </button>
//                 </div>
//               </div>
//               <div className="table-container">
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>ID</th>
//                       <th>Name</th>
//                       <th>Department</th>
//                       <th>Position</th>
//                       <th>Join Date</th>
//                       <th>Status</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredEmployees.map(employee => (
//                       <tr key={employee.id}>
//                         <td>{employee.id}</td>
//                         <td className="employee-name">
//                           <div className="avatar-small">{employee.name.charAt(0)}</div>
//                           {employee.name}
//                         </td>
//                         <td>{employee.department}</td>
//                         <td>{employee.position}</td>
//                         <td>{new Date(employee.joinDate).toLocaleDateString()}</td>
//                         <td>
//                           <span className={`status-badge ${employee.status.toLowerCase().replace(' ', '-')}`}>
//                             {employee.status}
//                           </span>
//                         </td>
//                         <td className="actions">
//                           <button className="btn-icon" title="View">
//                             <FiUsers size={16} />
//                           </button>
//                           <button className="btn-icon secondary" title="Edit">
//                             <FiBriefcase size={16} />
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="table-footer">
//                 <div className="pagination-info">
//                   Showing 1-{filteredEmployees.length} of {employees.length} employees
//                 </div>
//                 <div className="pagination-controls">
//                   <button className="btn-icon" disabled>
//                     &lt;
//                   </button>
//                   <button className="btn-icon">
//                     &gt;
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'recruitment' && (
//             <div className="card">
//               <div className="card-header">
//                 <h2>Recruitment Dashboard</h2>
//               </div>
//               <div className="card-content">
//                 <p>Recruitment content goes here...</p>
//               </div>
//             </div>
//           )}

//           {activeTab === 'attendance' && (
//             <div className="card">
//               <div className="card-header">
//                 <h2>Attendance Management</h2>
//               </div>
//               <div className="card-content">
//                 <p>Attendance content goes here...</p>
//               </div>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// // Reusable Metric Card Component
// const MetricCard = ({ title, value, icon, trend, change }) => {
//   return (
//     <div className="metric-card">
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

// // Reusable Quick Action Component
// const QuickAction = ({ title, icon, color, onClick }) => {
//   return (
//     <div className={`quick-action ${color}`} onClick={onClick}>
//       <div className="action-icon">{icon}</div>
//       <span>{title}</span>
//     </div>
//   );
// };

// export default HRDashboard;













// New HR Dashboard
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './HRDashboard.css';

ChartJS.register(
  CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend
);

const HRDashboard = () => {
  // Color palette
  const colors = {
    navy: '#0F172A',       // Dark navy for navbar
    primary: '#1E40AF',    // Primary blue
    accent: '#3B82F6',     // Accent blue
    success: '#10B981',    // Green
    warning: '#F59E0B',    // Yellow
    danger: '#EF4444',     // Red
    text: '#1F2937',       // Dark gray
    lightText: '#6B7280',  // Light gray
    border: '#E5E7EB'      // Border color
  };

  // Department headcount data
  const headcountData = {
    labels: ['Production', 'Engineering', 'Sales', 'Maintenance', 'Admin'],
    datasets: [{
      label: 'Employees',
      data: [142, 38, 22, 28, 15],
      backgroundColor: colors.primary,
      borderRadius: 4
    }]
  };

  // Hiring trends data
  const hiringTrendsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Hires',
        data: [5, 8, 12, 10, 15, 18],
        borderColor: colors.primary,
        backgroundColor: 'transparent',
        tension: 0.3,
        borderWidth: 3
      },
      {
        label: 'Attrition',
        data: [3, 4, 6, 5, 7, 4],
        borderColor: colors.danger,
        backgroundColor: 'transparent',
        tension: 0.3,
        borderWidth: 3
      }
    ]
  };

  // KPI cards
  const kpis = [
    { 
      title: 'Total Employees', 
      value: '245', 
      change: '+8%', 
      trend: 'up',
      icon: '👥'
    },
    { 
      title: 'Open Positions', 
      value: '14', 
      change: '-3', 
      trend: 'down',
      icon: '📋'
    },
    { 
      title: 'Avg. Tenure', 
      value: '4.2 yrs', 
      change: '+0.3', 
      trend: 'up',
      icon: '⏳'
    },
    { 
      title: 'Training Hours', 
      value: '1,850', 
      change: '+42%', 
      trend: 'up',
      icon: '🎓'
    }
  ];

  // Upcoming events
  const events = [
    { date: 'Jun 15', title: 'Safety Training', department: 'Production', status: 'confirmed' },
    { date: 'Jun 18', title: 'Team Building', department: 'Engineering', status: 'confirmed' },
    { date: 'Jun 22', title: 'HR Policy Review', department: 'All', status: 'pending' },
    { date: 'Jun 28', title: 'Quarterly All-Hands', department: 'Company', status: 'confirmed' }
  ];

  // Recent hires
  const recentHires = [
    { name: 'Alex Johnson', role: 'Assembly Tech', dept: 'Production', start: 'Jun 1' },
    { name: 'Sarah Chen', role: 'Mech Engineer', dept: 'Engineering', start: 'May 28' },
    { name: 'Michael R.', role: 'Field Tech', dept: 'Maintenance', start: 'May 15' },
    { name: 'Emily Wilson', role: 'Sales Rep', dept: 'Sales', start: 'May 10' }
  ];

  return (
    <div className="hr-dashboard">
      {/* Sticky Dark Blue Navbar */}
      <header className="dashboard-header" style={{ 
        backgroundColor: colors.navy,
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div className="header-content">
          <div className="brand">
            <span className="logo" style={{ color: 'white' }}>🏭</span>
            <h1 style={{ color: 'white' }}>ConveyorCo HR Analytics</h1>
          </div>
          <div className="header-actions">
            <span className="current-period" style={{ color: 'rgba(255,255,255,0.9)' }}>June 2023</span>
            <button className="notifications" style={{ color: 'white' }}>🔔</button>
          </div>
        </div>
      </header>

      {/* Main Content - White Theme */}
      <main className="dashboard-main" style={{ backgroundColor: 'white' }}>
        {/* KPI Cards */}
        <section className="kpi-section">
          {kpis.map((kpi, index) => (
            <div 
              key={index} 
              className="kpi-card" 
              style={{ 
                border: `1px solid ${colors.border}`,
                backgroundColor: '#F9FAFB'
              }}
            >
              <div className="kpi-icon" style={{ color: colors.primary }}>
                {kpi.icon}
              </div>
              <div className="kpi-details">
                <h3 style={{ color: colors.lightText }}>{kpi.title}</h3>
                <h2 style={{ color: colors.text }}>{kpi.value}</h2>
                <p style={{ 
                  color: kpi.trend === 'up' ? colors.success : colors.danger,
                  fontWeight: 500
                }}>
                  {kpi.change} {kpi.trend === 'up' ? '↑' : '↓'}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Charts Section */}
        <section className="charts-section">
          <div 
            className="chart-card" 
            style={{ 
              border: `1px solid ${colors.border}`,
              backgroundColor: 'white'
            }}
          >
            <h3 style={{ color: colors.text }}>Department Headcount</h3>
            <div className="chart-container">
              <Bar
                data={headcountData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false }
                  },
                  scales: {
                    y: {
                      ticks: { color: colors.lightText },
                      grid: { color: colors.border }
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
            style={{ 
              border: `1px solid ${colors.border}`,
              backgroundColor: 'white'
            }}
          >
            <h3 style={{ color: colors.text }}>Hiring Trends 2023</h3>
            <div className="chart-container">
              <Line
                data={hiringTrendsData}
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
                      grid: { color: colors.border }
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

        {/* Bottom Section */}
        <section className="bottom-section">
          {/* Upcoming Events */}
          <div 
            className="events-card" 
            style={{ 
              border: `1px solid ${colors.border}`,
              backgroundColor: 'white'
            }}
          >
            <h3 style={{ color: colors.text }}>Upcoming Events</h3>
            <div className="events-list">
              {events.map((event, index) => (
                <div key={index} className="event-item">
                  <div className="event-date" style={{ color: colors.primary }}>
                    {event.date}
                  </div>
                  <div className="event-details">
                    <h4 style={{ color: colors.text }}>{event.title}</h4>
                    <p style={{ color: colors.lightText }}>{event.department}</p>
                  </div>
                  <span 
                    className="event-status" 
                    style={{ 
                      backgroundColor: event.status === 'confirmed' ? '#D1FAE5' : '#FEF3C7',
                      color: event.status === 'confirmed' ? '#065F46' : '#92400E'
                    }}
                  >
                    {event.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Hires */}
          <div 
            className="hires-card" 
            style={{ 
              border: `1px solid ${colors.border}`,
              backgroundColor: 'white'
            }}
          >
            <h3 style={{ color: colors.text }}>Recent Hires</h3>
            <div className="hires-table">
              <table>
                <thead>
                  <tr>
                    <th style={{ color: colors.lightText }}>Name</th>
                    <th style={{ color: colors.lightText }}>Role</th>
                    <th style={{ color: colors.lightText }}>Department</th>
                    <th style={{ color: colors.lightText }}>Start Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentHires.map((hire, index) => (
                    <tr key={index}>
                      <td style={{ color: colors.text }}>{hire.name}</td>
                      <td style={{ color: colors.text }}>{hire.role}</td>
                      <td style={{ color: colors.text }}>{hire.dept}</td>
                      <td style={{ color: colors.text }}>{hire.start}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HRDashboard;