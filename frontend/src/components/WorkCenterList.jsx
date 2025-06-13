import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './WorkCenterList.css';
import TopNavbar from './TopNavbar';

const WorkCenterList = () => {
  const [workCenters, setWorkCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingWorkCenter, setEditingWorkCenter] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    location: '',
    status: 'active',
    capacity: '',
    efficiency: ''
  });

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

  const handleDelete = async (_id) => {
    if (window.confirm('Are you sure you want to delete this work center?')) {
      try {
        await axios.delete(`http://localhost:8000/workcenter/delete/${_id}`);
        setWorkCenters(prev => prev.filter(wc => wc._id !== _id));
      } catch (err) {
        console.error('Error deleting:', err);
        setError(err.message);
      }
    }
  };

  const handleEditClick = (workCenter) => {
    setEditingWorkCenter(workCenter);
    setFormData({
      code: workCenter.code,
      name: workCenter.name,
      location: workCenter.location,
      status: workCenter.status,
      capacity: workCenter.capacity,
      efficiency: workCenter.efficiency
    });
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/workcenter/update/${editingWorkCenter._id}`,
        formData
      );
      
      setWorkCenters(prev => 
        prev.map(wc => 
          wc._id === editingWorkCenter._id ? response.data : wc
        )
      );
      setShowEditModal(false);
    } catch (err) {
      console.error('Error updating work center:', err);
      setError(err.message);
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
          <div style={{ textAlign: 'right' }}>
            <Link to="/workcenter/create" className="primary-button">
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
                  <tr key={workCenter._id}>
                    <td>
                      <Link to={`/workcenters/${workCenter._id}`} className="code-link">
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
                        <button
                          onClick={() => handleEditClick(workCenter)}
                          className="edit-button"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(workCenter._id)}
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

        {/* Edit Modal */}
        {showEditModal && (
          <div className="modal-overlay">
            <div className="modal-container">
              <div className="modal-dialog">
                <div className="modal-header">
                  <h3>Edit Work Center</h3>
                  <button 
                    onClick={() => setShowEditModal(false)} 
                    className="close-button"
                  >
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Code</label>
                        <input
                          type="text"
                          name="code"
                          value={formData.code}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Status</label>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="maintenance">Maintenance</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Capacity (units/hr)</label>
                        <input
                          type="number"
                          name="capacity"
                          value={formData.capacity}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Efficiency (%)</label>
                        <input
                          type="number"
                          name="efficiency"
                          value={formData.efficiency}
                          onChange={handleInputChange}
                          min="0"
                          max="100"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="modal-footer">
                      <button
                        type="button"
                        onClick={() => setShowEditModal(false)}
                        className="btn btn-secondary"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WorkCenterList;