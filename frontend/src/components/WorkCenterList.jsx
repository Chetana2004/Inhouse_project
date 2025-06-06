import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './WorkCenterList.css';
import './TopNavbar';
import TopNavbar from './TopNavbar';

const WorkCenterList = () => {
  const [workCenters, setWorkCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchWorkCenters = async () => {
      try {
        const response = await axios.get('http://localhost:8000/workcenter/list');
        setWorkCenters(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWorkCenters();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this work center?')) {
      try {
        await axios.delete(`/api/workcenters/${id}`);
        setWorkCenters(workCenters.filter(wc => wc.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const filteredWorkCenters = workCenters.filter(wc =>
    wc.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wc.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading">Loading work centers...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <>
    <TopNavbar />
    <div className="work-center-list-container">
      <div className="header-section">
        <h1>Work Centers</h1>
        <p className="subtitle">Manage your conveyor manufacturing resources</p>
        <div className="action-bar">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search work centers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
          <Link to="/workcenters/new" className="primary-button">
            + New Work Center
          </Link>
        </div>
      </div>

      <div className="work-center-table-container">
        <table className="work-center-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Location</th>
              <th>Status</th>
              <th>Capacity</th>
              <th>Efficiency</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkCenters.length > 0 ? (
              filteredWorkCenters.map((workCenter) => (
                <tr key={workCenter.id}>
                  <td>
                    <Link to={`/workcenters/${workCenter.id}`} className="code-link">
                      {workCenter.code}
                    </Link>
                  </td>
                  <td>{workCenter.name}</td>
                  <td>{workCenter.location}</td>
                  <td>
                    <span className={`status-badge ${workCenter.status}`}>
                      {workCenter.status}
                    </span>
                  </td>
                  <td>{workCenter.capacity} units/hr</td>
                  <td>
                    <div className="efficiency-bar-container">
                      <div 
                        className="efficiency-bar" 
                        style={{ width: `${workCenter.efficiency}%` }}
                      ></div>
                      <span className="efficiency-text">{workCenter.efficiency}%</span>
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link 
                        to={`/workcenters/${workCenter.id}/edit`} 
                        className="edit-button"
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(workCenter.id)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-results">
                  No work centers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default WorkCenterList;