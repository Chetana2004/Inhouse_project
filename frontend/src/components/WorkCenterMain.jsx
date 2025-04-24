import React, { useState } from "react";
import "./WorkCenterMain.css";

const WorkCenterMain = ({ workCenters, onUpdate }) => {
  const [activeTab, setActiveTab] = useState("list");
  const [editWorkCenter, setEditWorkCenter] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    const updated = workCenters.map((wc) =>
      wc.id === id ? { ...wc, status: newStatus } : wc
    );
    onUpdate(updated.find((wc) => wc.id === id));
  };

  const handleEdit = (workCenter) => {
    setEditWorkCenter(workCenter);
    setActiveTab("edit");
  };

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updated = {
      ...editWorkCenter,
      name: formData.get("name"),
      code: formData.get("code"),
      type: formData.get("type"),
      supervisor: formData.get("supervisor"),
    };
    onUpdate(updated);
    setEditWorkCenter(null);
    setActiveTab("list");
  };

  return (
    <div className="work-center-main">
      <div className="main-tabs">
        <button
          className={activeTab === "list" ? "active" : ""}
          onClick={() => setActiveTab("list")}
        >
          Work Center List
        </button>
        {activeTab === "edit" && (
          <button className="active">Edit Work Center</button>
        )}
      </div>

      <div className="main-content">
        {activeTab === "list" ? (
          <div className="work-center-list">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Supervisor</th>
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
                      <select
                        value={wc.status}
                        onChange={(e) =>
                          handleStatusChange(wc.id, e.target.value)
                        }
                      >
                        <option value="Running">Running</option>
                        <option value="Idle">Idle</option>
                        <option value="Maintenance">Maintenance</option>
                      </select>
                    </td>
                    <td>{wc.supervisor}</td>
                    <td>
                      <button onClick={() => handleEdit(wc)}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="edit-form">
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editWorkCenter?.name}
                  required
                />
              </div>
              <div className="form-group">
                <label>Code:</label>
                <input
                  type="text"
                  name="code"
                  defaultValue={editWorkCenter?.code}
                  required
                />
              </div>
              <div className="form-group">
                <label>Type:</label>
                <select name="type" defaultValue={editWorkCenter?.type}>
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
                  defaultValue={editWorkCenter?.supervisor}
                />
              </div>
              <div className="form-actions">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setActiveTab("list")}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkCenterMain;
