import React, { useState } from 'react';
import './RoutingCreate.css';
import TopNavbar from './TopNavbar';

const RoutingCreate = () => {
  const [operations, setOperations] = useState([
    {
      id: 1,
      name: 'Cutting',
      workCenter: 'Cutting Station1',
      duration: '15 min',
      sequence: '1',
      allowOverlap: false,
      blockingTime: '2 min',
      cost: 'Rs. 100'
    },
    {
      id: 2,
      name: 'Frame Assembly',
      workCenter: 'Assembly Bench 2',
      duration: '30 min',
      sequence: '2',
      allowOverlap: true,
      blockingTime: '0 min',
      cost: 'Rs. 200'
    }
  ]);

  const [newOperation, setNewOperation] = useState({
    name: '',
    workCenter: '',
    duration: '',
    sequence: '',
    allowOverlap: false,
    blockingTime: '',
    cost: ''
  });

  const handleAddOperation = () => {
    if (newOperation.name && newOperation.workCenter) {
      setOperations([...operations, {
        ...newOperation,
        id: operations.length + 1
      }]);
      setNewOperation({
        name: '',
        workCenter: '',
        duration: '',
        sequence: '',
        allowOverlap: false,
        blockingTime: '',
        cost: ''
      });
    }
  };

  const handleDeleteOperation = (id) => {
    setOperations(operations.filter(op => op.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewOperation({
      ...newOperation,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <>
    <TopNavbar />
    <div className="dashboard-container">
      <main className="dashboard-content">
        <section className="routing-section">
          <h2 className="section-title">New Routing</h2>
          
          <div className="basic-info-section">
            <h3 className="subsection-title">Basic Info</h3>
            <div className="form-grid">
              <div className="form-field">
                <label className="form-label">Routing Name</label>
                <input type="text" className="form-input" />
              </div>
              <div className="form-field">
                <label className="form-label">Code</label>
                <input type="text" className="form-input" />
              </div>
              <div className="form-field">
                <label className="form-label">Associated Product</label>
                <input type="text" className="form-input" />
              </div>
            </div>
          </div>

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
                      <th>Duration</th>
                      <th>Sequence</th>
                      <th>Allow Overlap</th>
                      <th>Blocking Time</th>
                      <th>Cost per Operation</th>
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
                          <span className={`status-badge ${operation.allowOverlap ? 'yes' : 'no'}`}>
                            {operation.allowOverlap ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td>{operation.blockingTime}</td>
                        <td>{operation.cost}</td>
                        <td>
                          <button 
                            className="delete-btn"
                            onClick={() => handleDeleteOperation(operation.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr className="add-row">
                      <td>
                        <input
                          type="text"
                          name="name"
                          value={newOperation.name}
                          onChange={handleInputChange}
                          placeholder="Operation Name"
                          className="table-input"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="workCenter"
                          value={newOperation.workCenter}
                          onChange={handleInputChange}
                          placeholder="Work Center"
                          className="table-input"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="duration"
                          value={newOperation.duration}
                          onChange={handleInputChange}
                          placeholder="Duration"
                          className="table-input"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="sequence"
                          value={newOperation.sequence}
                          onChange={handleInputChange}
                          placeholder="Sequence"
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
                          type="text"
                          name="blockingTime"
                          value={newOperation.blockingTime}
                          onChange={handleInputChange}
                          placeholder="Blocking Time"
                          className="table-input"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="cost"
                          value={newOperation.cost}
                          onChange={handleInputChange}
                          placeholder="Cost"
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
          </div>
        </section>
      </main>
    </div>
    </>
  );
};

export default RoutingCreate;