// import React from 'react'
// import TopNavbar from './TopNavbar'

// const RoutingList = () => {
//   return (
//     <div>
//       <TopNavbar />
//       List of all Routings
//     </div>
//   )
// }

// export default RoutingList



import React from 'react';
import './RoutingList.css';
import TopNavbar from './TopNavbar';

const RoutingsList = () => {
  const routingsData = [
    {
      id: 'RT-1001',
      name: 'Conveyor Assembly',
      product: 'Conveyor System',
      status: 'Active',
      operations: '5 steps',
      createdDate: '4/20/2025',
      actions: '💬️'
    },
    {
      id: 'RT-1002',
      name: 'Frame Welding',
      product: 'Steel Frame',
      status: 'Draft',
      operations: '3 steps',
      createdDate: '4/18/2025',
      actions: '💬️'
    },
    {
      id: 'RT-1003',
      name: 'PCB Assembly',
      product: 'Control Board',
      status: 'Active',
      operations: '8 steps',
      createdDate: '4/15/2025',
      actions: '💬️'
    }
  ];

  return (
    <>
    <TopNavbar />
    <div className="routings-list-container">
      <header className="routings-list-header">
        <h1>Routing Definitions</h1>
        <button className="new-routing-btn">New Routing</button>
      </header>

      <div className="routings-list-table-container">
        <table className="routings-list-table">
          <thead>
            <tr>
              <th>Routing ID</th>
              <th>Name</th>
              <th>Product</th>
              <th>Status</th>
              <th>Operations</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {routingsData.map((routing, index) => (
              <tr key={index}>
                <td className="routing-id">{routing.id}</td>
                <td>{routing.name}</td>
                <td>{routing.product}</td>
                <td>
                  <span className={`status-badge status-${routing.status.toLowerCase()}`}>
                    {routing.status}
                  </span>
                </td>
                <td>{routing.operations}</td>
                <td>{routing.createdDate}</td>
                <td>
                  <button className="action-btn">{routing.actions}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divider"></div>

      <div className="new-routing-section">
        <h2>New Routing</h2>
        <p className="subtext">Click the button above to create a new Routing Definition</p>
      </div>
    </div>
    </>
  );
};

export default RoutingsList;