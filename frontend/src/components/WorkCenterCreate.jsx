import React, { useState } from 'react';
import axios from 'axios';
import './WorkCenterCreate.css';
import TopNavbar from './TopNavbar';

const WorkCenterCreate = () => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    location: '',
    supervisor: '',
    status: 'active',
    capacity: '',
    efficiency: '100',
    costRate: '',
    calendar: 'default',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/workcenter/create', formData);
      setMessage(`Work Center "${response.data.name}" created successfully!`);
      setFormData({
        code: '',
        name: '',
        description: '',
        location: '',
        supervisor: '',
        status: 'active',
        capacity: '',
        efficiency: '100',
        costRate: '',
        calendar: 'default',
      });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create work center');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopNavbar />

      <div className="work-center-create-container">
        <div className="header-section">
          <h1>Create New Work Center</h1>
          <p className="subtitle">Define production resources for conveyor manufacturing</p>
        </div>

        <form onSubmit={handleSubmit} className="work-center-form">
          <div className="form-grid">
            {/* -- Form Inputs (Same as before) -- */}
            {['code', 'name', 'location', 'supervisor', 'capacity', 'efficiency', 'costRate'].map(field => (
              <div className="form-group" key={field}>
                <label htmlFor={field}>
                  {field === 'code' ? 'Work Center Code*' :
                   field === 'name' ? 'Name*' :
                   field === 'location' ? 'Location' :
                   field === 'supervisor' ? 'Supervisor' :
                   field === 'capacity' ? 'Capacity (units/hour)' :
                   field === 'efficiency' ? 'Efficiency (%)' :
                   'Cost Rate ($/hour)'}
                </label>
                <input
                  type={field === 'costRate' || field === 'capacity' || field === 'efficiency' ? 'number' : 'text'}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required={field === 'code' || field === 'name'}
                  placeholder={
                    field === 'code' ? 'e.g., WC-1001' :
                    field === 'name' ? 'e.g., Assembly Line 1' :
                    field === 'location' ? 'e.g., Plant A, Section 3' :
                    field === 'supervisor' ? 'Supervisor name' :
                    field === 'capacity' ? 'e.g., 50' :
                    field === 'efficiency' ? '100' :
                    'e.g., 45.00'
                  }
                  min={field === 'efficiency' ? '1' : field === 'costRate' ? '0' : undefined}
                  max={field === 'efficiency' ? '100' : undefined}
                  step={field === 'costRate' ? '0.01' : '1'}
                />
              </div>
            ))}

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="calendar">Working Calendar</label>
              <select
                id="calendar"
                name="calendar"
                value={formData.calendar}
                onChange={handleChange}
              >
                <option value="default">Default (8x5)</option>
                <option value="shift1">Shift 1 (6:00-14:00)</option>
                <option value="shift2">Shift 2 (14:00-22:00)</option>
                <option value="continuous">Continuous (24/7)</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Additional details about this work center..."
              />
            </div>
          </div>

          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}

          <div className="form-actions">
            <button type="button" className="secondary-button" onClick={() => setFormData({
              code: '',
              name: '',
              description: '',
              location: '',
              supervisor: '',
              status: 'active',
              capacity: '',
              efficiency: '100',
              costRate: '',
              calendar: 'default',
            })}>
              Cancel
            </button>
            <button type="submit" className="primary-button" disabled={loading}>
              {loading ? 'Saving...' : 'Save Work Center'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default WorkCenterCreate;
