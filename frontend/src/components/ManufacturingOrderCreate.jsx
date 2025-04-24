
import React, { useState } from 'react';
import './ManufacturingOrderCreate.css';
import TopNavbar from './TopNavbar';

const ManufacturingOrderCreate = () => {
  const [bomOption, setBomOption] = useState('-');
  const [routingOption, setRoutingOption] = useState('-');
  
  const bomOptions = [
    { value: '-', label: '-' },
    { value: 'BOM-001', label: 'BOM-001: Standard Assembly' },
    { value: 'BOM-002', label: 'BOM-002: Premium Components' },
    { value: 'BOM-003', label: 'BOM-003: Rapid Production' }
  ];
  
  const routingOptions = [
    { value: '-', label: '-' },
    { value: 'RT-100', label: 'RT-100: Standard Routing' },
    { value: 'RT-200', label: 'RT-200: Express Routing' },
    { value: 'RT-300', label: 'RT-300: Quality Focus' }
  ];

  return (
    <>
    <TopNavbar />
    <div className="manufacturing-order-wrapper">
      <div className="manufacturing-order">
        <header className="order-header">
          <h1>Manufacturing Order</h1>
          <div className="header-border"></div>
        </header>

        <div className="order-sections">
          <section className="product-section">
            <h2>Product</h2>
            <div className="product-details">
              <div className="detail-item">
                <label className="detail-label">BOM</label>
                <select 
                  value={bomOption}
                  onChange={(e) => setBomOption(e.target.value)}
                  className="detail-select"
                >
                  {bomOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="detail-item">
                <label className="detail-label">Routing</label>
                <select 
                  value={routingOption}
                  onChange={(e) => setRoutingOption(e.target.value)}
                  className="detail-select"
                >
                  {routingOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <section className="components-section">
            <h2>Components</h2>
            <table className="components-table">
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Quantity</th>
                  <th>Available</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cortex</td>
                  <td>No</td>
                  <td className="available-yes">Yes</td>
                </tr>
                <tr>
                  <td>Ratio</td>
                  <td>12</td>
                  <td className="available-no">No</td>
                </tr>
                <tr>
                  <td>Unit</td>
                  <td>1</td>
                  <td className="available-yes">100</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="work-order-section">
            <h2>Work Order</h2>
            <table className="work-order-table">
              <thead>
                <tr>
                  <th>Operation</th>
                  <th>Work Center</th>
                  <th>Duration</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Getting Started</td>
                  <td>Getting Started</td>
                  <td>If quit</td>
                  <td>Date</td>
                </tr>
                <tr className="in-progress">
                  <td>Frame Assembly</td>
                  <td>Assembly Period A</td>
                  <td>90 min</td>
                  <td>
                    <span className="status-badge in-progress-badge">In Progress</span>
                  </td>
                </tr>
                <tr>
                  <td>Operation Name</td>
                  <td>Work Center</td>
                  <td>Duration</td>
                  <td>Start</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>

        <div className="action-buttons">
          <button className="cancel-btn">Cancel</button>
          <button className="save-btn">Save</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default ManufacturingOrderCreate;
