import React, { useEffect, useState } from "react";
import axios from "axios";
import TopNavbar from "./TopNavbar";
import "./RoutingList.css";

const RoutingList = () => {
  const [routings, setRoutings] = useState([]);
  const [editRouting, setEditRouting] = useState(null);

  useEffect(() => {
    fetchRoutings();
  }, []);

  const fetchRoutings = () => {
    axios
      .get("http://localhost:5000/routing")
      .then((res) => setRoutings(res.data))
      .catch(() => alert("Failed to fetch routings"));
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this routing?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/routing/${id}`);
      alert("Routing deleted.");
      fetchRoutings();
    } catch (err) {
      alert("Failed to delete routing.");
    }
  };

  const handleEditInit = (routing) => {
    // Clone routing to edit
    setEditRouting(JSON.parse(JSON.stringify(routing)));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditRouting({ ...editRouting, [name]: value });
  };

  const handleOperationChange = (index, field, value) => {
    const updatedOps = [...editRouting.operations];
    updatedOps[index][field] = value;
    setEditRouting({ ...editRouting, operations: updatedOps });
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/routing/${editRouting._id}`,
        editRouting
      );
      alert("Routing updated successfully.");
      setEditRouting(null);
      fetchRoutings();
    } catch (err) {
      alert("Failed to update routing.");
      console.error(err);
    }
  };
  const handleAddOperationBelow = (index) => {
    const newOp = {
      name: "",
      workCenter: "",
      duration: "",
      sequence: "",
    };
    const updatedOps = [...editRouting.operations];
    updatedOps.splice(index + 1, 0, newOp);
    setEditRouting({ ...editRouting, operations: updatedOps });
  };

  const handleDeleteOperation = (index) => {
    const updatedOps = [...editRouting.operations];
    updatedOps.splice(index, 1);
    setEditRouting({ ...editRouting, operations: updatedOps });
  };

  return (
    <>
      <TopNavbar />
      <div className="routing-list-container">
        <h2 className="section-title">Routing List</h2>

        {routings.length === 0 ? (
          <p>No routing records found.</p>
        ) : (
          <table className="routing-table">
            <thead>
              <tr>
                <th>Routing Name</th>
                <th>Code</th>
                <th>Associated Product</th>
                <th>Operations</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {routings.map((route) => (
                <tr key={route._id}>
                  <td>{route.routingName}</td>
                  <td>{route.code}</td>
                  <td>{route.associatedProduct}</td>
                  <td>
                    <ul>
                      {route.operations.map((op, i) => (
                        <li key={i}>
                          {op.sequence}. {op.name} — {op.workCenter},{" "}
                          {op.duration} min
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <button
                      className="action-btn edit"
                      onClick={() => handleEditInit(route)}
                    >
                      Edit
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDelete(route._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Modal Editor */}
        {editRouting && (
          <div className="modal-overlay">
            <div className="modal modal-wide">
              <h3>Edit Routing</h3>

              <label>Routing Name</label>
              <input
                name="routingName"
                value={editRouting.routingName}
                onChange={handleEditChange}
              />

              <label>Code</label>
              <input
                name="code"
                value={editRouting.code}
                onChange={handleEditChange}
              />

              <label>Associated Product</label>
              <input
                name="associatedProduct"
                value={editRouting.associatedProduct}
                onChange={handleEditChange}
              />

              <h4>Operations</h4>
              {editRouting.operations.map((op, i) => (
                <div key={i} className="operation-edit-row">
                  <input
                    placeholder="Name"
                    value={op.name}
                    onChange={(e) =>
                      handleOperationChange(i, "name", e.target.value)
                    }
                  />
                  <input
                    placeholder="Work Center"
                    value={op.workCenter}
                    onChange={(e) =>
                      handleOperationChange(i, "workCenter", e.target.value)
                    }
                  />
                  <input
                    placeholder="Duration"
                    value={op.duration}
                    onChange={(e) =>
                      handleOperationChange(i, "duration", e.target.value)
                    }
                  />
                  <input
                    placeholder="Sequence"
                    value={op.sequence}
                    onChange={(e) =>
                      handleOperationChange(i, "sequence", e.target.value)
                    }
                  />
                  <button
                    className="action-btn save"
                    onClick={() => handleAddOperationBelow(i)}
                  >
                    Add
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => handleDeleteOperation(i)}
                  >
                    Delete
                  </button>
                </div>
              ))}

              <div className="modal-actions">
                <button className="action-btn save" onClick={handleEditSubmit}>
                  Save
                </button>
                <button
                  className="action-btn cancel"
                  onClick={() => setEditRouting(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RoutingList;
