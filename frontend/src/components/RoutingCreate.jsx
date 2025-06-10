import React, { useState } from "react";
import "./RoutingCreate.css";
import TopNavbar from "./TopNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RoutingCreate = () => {
  const navigate = useNavigate();
  const [operations, setOperations] = useState([]);

  const [newOperation, setNewOperation] = useState({
    name: "",
    workCenter: "",
    duration: "",
    sequence: "",
    allowOverlap: false,
    blockingTime: "",
    cost: "",
  });

  const [routingName, setRoutingName] = useState("");
  const [code, setCode] = useState("");
  const [associatedProduct, setAssociatedProduct] = useState("");

  const handleAddOperation = () => {
    if (newOperation.name && newOperation.workCenter) {
      setOperations([
        ...operations,
        {
          ...newOperation,
          id: operations.length + 1,
        },
      ]);
      setNewOperation({
        name: "",
        workCenter: "",
        duration: "",
        sequence: "",
        allowOverlap: false,
        blockingTime: "",
        cost: "",
      });
    }
  };

  const handleDeleteOperation = (id) => {
    setOperations(operations.filter((op) => op.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewOperation({
      ...newOperation,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmitRouting = async () => {
    try {
      const payload = {
        routingName,
        code,
        associatedProduct,
        operations,
      };
      await axios.post("http://localhost:8000/routing/create", payload);
      alert("Routing saved successfully!");
    } catch (err) {
      alert("Failed to save routing.");
      console.error(err);
    }
  };

  return (
    <>
      <TopNavbar />
      <div className="dashboard-container">
        <main className="dashboard-content">
          <section className="routing-section">
            <h2 className="section-title">Create New Routing</h2>

            {/* Basic Info Section */}
            <div className="basic-info-section">
              <h3 className="subsection-title">Basic Info</h3>
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label">Routing Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={routingName}
                    onChange={(e) => setRoutingName(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Code</label>
                  <input
                    type="text"
                    className="form-input"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Associated Product</label>
                  <input
                    type="text"
                    className="form-input"
                    value={associatedProduct}
                    onChange={(e) => setAssociatedProduct(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Operations Table */}
            <div className="routing-details-section">
              <h3 className="subsection-title">Routing Details</h3>

              <div className="operations-section">
                <h4 className="operations-title">Operations</h4>
                <div className="table-container">
                  <table className="operations-table">
                    <thead>
                      <tr>
                        <th>Operation Name</th>
                        <th>Work Center</th>
                        <th>Duration (min)</th>
                        <th>Sequence</th>
                        <th>Allow Overlap</th>
                        <th>Blocking Time (min)</th>
                        <th>Cost (₹)</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {operations.map((operation) => (
                        <tr key={operation.id}>
                          <td>{operation.name}</td>
                          <td>{operation.workCenter}</td>
                          <td>{operation.duration}</td>
                          <td>{operation.sequence}</td>
                          <td>
                            <span
                              className={`status-badge ${
                                operation.allowOverlap ? "yes" : "no"
                              }`}
                            >
                              {operation.allowOverlap ? "Yes" : "No"}
                            </span>
                          </td>
                          <td>{operation.blockingTime}</td>
                          <td>{operation.cost}</td>
                          <td>
                            <button
                              className="delete-btn"
                              onClick={() =>
                                handleDeleteOperation(operation.id)
                              }
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                      <tr className="add-row">
                        <td>
                          <input
                            name="name"
                            value={newOperation.name}
                            onChange={handleInputChange}
                            className="table-input"
                          />
                        </td>
                        <td>
                          <input
                            name="workCenter"
                            value={newOperation.workCenter}
                            onChange={handleInputChange}
                            className="table-input"
                          />
                        </td>
                        <td>
                          <input
                            name="duration"
                            value={newOperation.duration}
                            onChange={handleInputChange}
                            className="table-input"
                          />
                        </td>
                        <td>
                          <input
                            name="sequence"
                            value={newOperation.sequence}
                            onChange={handleInputChange}
                            className="table-input"
                          />
                        </td>
                        <td>
                          <label className="checkbox-container">
                            <input
                              type="checkbox"
                              name="allowOverlap"
                              checked={newOperation.allowOverlap}
                              onChange={handleInputChange}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </td>
                        <td>
                          <input
                            name="blockingTime"
                            value={newOperation.blockingTime}
                            onChange={handleInputChange}
                            className="table-input"
                          />
                        </td>
                        <td>
                          <input
                            name="cost"
                            value={newOperation.cost}
                            onChange={handleInputChange}
                            className="table-input"
                          />
                        </td>
                        <td>
                          <button
                            className="add-btn"
                            onClick={handleAddOperation}
                          >
                            Add
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="button-container">
                <button className="add-btn" onClick={handleSubmitRouting}>
                      Save Routing
                </button>
              </div>

            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default RoutingCreate;
