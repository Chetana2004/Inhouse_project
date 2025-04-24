import React, { useState } from "react";
import "./WorkCenterDashboard.css";

const WorkCenterDashboard = ({ workCenters, onStatusChange }) => {
  const [dateRange, setDateRange] = useState("week");
  const [selectedCenter, setSelectedCenter] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    onStatusChange(id, newStatus);
  };

  const statusCounts = workCenters.reduce((acc, wc) => {
    acc[wc.status] = (acc[wc.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="dashboard-container">
      <div className="dashboard-controls">
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        >
          <option value="day">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      <div className="status-summary">
        <div className="status-card running">
          <h3>Running</h3>
          <p>{statusCounts.Running || 0}</p>
        </div>
        <div className="status-card idle">
          <h3>Idle</h3>
          <p>{statusCounts.Idle || 0}</p>
        </div>
        <div className="status-card maintenance">
          <h3>Maintenance</h3>
          <p>{statusCounts.Maintenance || 0}</p>
        </div>
      </div>

      <div className="work-center-details">
        {selectedCenter ? (
          <div className="center-detail">
            <h3>{selectedCenter.name} Details</h3>
            <div className="detail-row">
              <span>Current Job:</span>
              <input
                type="text"
                value={selectedCenter.currentJob || ""}
                onChange={(e) =>
                  setSelectedCenter({
                    ...selectedCenter,
                    currentJob: e.target.value,
                  })
                }
              />
            </div>
            <div className="detail-row">
              <span>Status:</span>
              <select
                value={selectedCenter.status}
                onChange={(e) => {
                  const newStatus = e.target.value;
                  setSelectedCenter({
                    ...selectedCenter,
                    status: newStatus,
                  });
                  handleStatusChange(selectedCenter.id, newStatus);
                }}
              >
                <option value="Running">Running</option>
                <option value="Idle">Idle</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
            <div className="detail-row">
              <span>Last Maintenance:</span>
              <input
                type="date"
                value={selectedCenter.lastMaintenance}
                onChange={(e) =>
                  setSelectedCenter({
                    ...selectedCenter,
                    lastMaintenance: e.target.value,
                  })
                }
              />
            </div>
            <div className="detail-row">
              <span>Next Maintenance:</span>
              <input
                type="date"
                value={selectedCenter.nextMaintenance}
                onChange={(e) =>
                  setSelectedCenter({
                    ...selectedCenter,
                    nextMaintenance: e.target.value,
                  })
                }
              />
            </div>
            <button onClick={() => setSelectedCenter(null)}>
              Back to List
            </button>
          </div>
        ) : (
          <table className="centers-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Utilization</th>
                <th>Current Job</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {workCenters.map((wc) => (
                <tr key={wc.id}>
                  <td>{wc.name}</td>
                  <td>
                    <span className={`status-badge ${wc.status.toLowerCase()}`}>
                      {wc.status}
                    </span>
                  </td>
                  <td>
                    <div className="utilization-bar">
                      <div
                        className="utilization-fill"
                        style={{ width: `${wc.utilization}%` }}
                      >
                        {wc.utilization}%
                      </div>
                    </div>
                  </td>
                  <td>{wc.currentJob || "None"}</td>
                  <td>
                    <button onClick={() => setSelectedCenter(wc)}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default WorkCenterDashboard;
