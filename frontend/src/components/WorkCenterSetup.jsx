import React, { useState } from "react";
import "./WorkCenterSetup.css";

const WorkCenterSetup = ({ workCenters, onAdd, onUpdate }) => {
  const [newWorkCenter, setNewWorkCenter] = useState({
    name: "",
    code: "",
    type: "Assembly",
    supervisor: "",
    status: "Idle",
    utilization: 0,
  });

  const [editId, setEditId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorkCenter({
      ...newWorkCenter,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      onUpdate({ ...newWorkCenter, id: editId });
      setEditId(null);
    } else {
      onAdd(newWorkCenter);
    }
    setNewWorkCenter({
      name: "",
      code: "",
      type: "Assembly",
      supervisor: "",
      status: "Idle",
      utilization: 0,
    });
  };

  const handleEdit = (workCenter) => {
    setNewWorkCenter(workCenter);
    setEditId(workCenter.id);
  };

  const handleCancel = () => {
    setNewWorkCenter({
      name: "",
      code: "",
      type: "Assembly",
      supervisor: "",
      status: "Idle",
      utilization: 0,
    });
    setEditId(null);
  };

  return (
    <div className="setup-container">
      <div className="setup-form">
        <h2>{editId ? "Edit Work Center" : "Add New Work Center"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={newWorkCenter.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Code:</label>
            <input
              type="text"
              name="code"
              value={newWorkCenter.code}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Type:</label>
            <select
              name="type"
              value={newWorkCenter.type}
              onChange={handleInputChange}
            >
              <option value="Assembly">Assembly</option>
              <option value="Installation">Installation</option>
              <option value="Testing">Testing</option>
            </select>
          </div>
          <div className="form-group">
            <label>Supervisor:</label>
            <input
              type="text"
              name="supervisor"
              value={newWorkCenter.supervisor}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Initial Status:</label>
            <select
              name="status"
              value={newWorkCenter.status}
              onChange={handleInputChange}
            >
              <option value="Running">Running</option>
              <option value="Idle">Idle</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
          <div className="form-group">
            <label>Initial Utilization (%):</label>
            <input
              type="number"
              name="utilization"
              min="0"
              max="100"
              value={newWorkCenter.utilization}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-actions">
            <button type="submit">{editId ? "Update" : "Add"}</button>
            {editId && (
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="work-center-list">
        <h2>Existing Work Centers</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Code</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workCenters.map((wc) => (
              <tr key={wc.id}>
                <td>{wc.id}</td>
                <td>{wc.name}</td>
                <td>{wc.code}</td>
                <td>{wc.type}</td>
                <td>
                  <span className={`status-badge ${wc.status.toLowerCase()}`}>
                    {wc.status}
                  </span>
                </td>
                <td>
                  <button onClick={() => handleEdit(wc)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkCenterSetup;
