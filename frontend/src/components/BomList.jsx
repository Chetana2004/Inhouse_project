// import React from 'react';
// import TopNavbar from './TopNavbar';

// const BomList = () => {
//   const bomData = [
//     {
//       id: 'BOM-4719',
//       name: 'Conveyor roller',
//       product: 'Conveyor roller',
//       status: 'Dash',
//       components: '1 items',
//       createdDate: '4/19/2025',
//       actions: '💬️'
//     },
//     {
//       id: 'BOM-3292',
//       name: 'roller',
//       product: 'roller',
//       status: 'Dash',
//       components: '1 items',
//       createdDate: '4/19/2025',
//       actions: '💬️'
//     }
//   ];

//   return (
//     <>
//     <TopNavbar/>
//     <div className="bom-list-container">
//       <header className="bom-list-header">
//         <h1>Bill of Materials</h1>
//         <button className="new-bom-btn">New BOM</button>
//       </header>

//       <div className="bom-list-table-container">
//         <table className="bom-list-table">
//           <thead>
//             <tr>
//               <th>BOM ID</th>
//               <th>Name</th>
//               <th>Product</th>
//               <th>Status</th>
//               <th>Components</th>
//               <th>Created Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bomData.map((bom, index) => (
//               <tr key={index}>
//                 <td className="bom-id">{bom.id}</td>
//                 <td>{bom.name}</td>
//                 <td>{bom.product}</td>
//                 <td>
//                   <span className={`status-badge status-${bom.status.toLowerCase()}`}>
//                     {bom.status}
//                   </span>
//                 </td>
//                 <td>{bom.components}</td>
//                 <td>{bom.createdDate}</td>
//                 <td>
//                   <button className="action-btn">{bom.actions}</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="divider"></div>

//       <div className="new-bom-section">
//         <h2>New BOM</h2>
//         <p className="subtext">Click the button above to create a new Bill of Materials</p>
//       </div>
//     </div>
//     </>
//   );
// };

// export default BomList;



import React from 'react';
import './BomList.css'; // We'll create this CSS file
import TopNavbar from './TopNavbar.jsx';

const BomList = () => {
  const boms = [
    {
      id: 'BOM-4719',
      name: 'Conveyor roller',
      product: 'Conveyor roller',
      status: '',
      components: '1 items',
      createdDate: '4/19/2025',
    },
    {
      id: 'BOM-3292',
      name: 'roller',
      product: 'roller',
      status: '',
      components: '1 items',
      createdDate: '4/19/2025',
    }
  ];

  return (
    <>
    <TopNavbar/>
    <div className="bom-container">
      <div className="bom-header">
        <h1>Bill of Materials</h1>
        <button className="new-bom-button">
          <i className="fas fa-plus"></i> New BOM
        </button>
      </div>

      <div className="bom-section">
        <h2>Current BOMs</h2>
        <div className="bom-table-container">
          <table className="bom-table">
            <thead>
              <tr>
                <th>BOM ID</th>
                <th>NAME</th>
                <th>PRODUCT</th>
                <th>STATUS</th>
                <th>COMPONENTS</th>
                <th>CREATED DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {boms.map((bom, index) => (
                <tr key={index}>
                  <td>{bom.id}</td>
                  <td>{bom.name}</td>
                  <td>{bom.product}</td>
                  <td>{bom.status}</td>
                  <td>{bom.components}</td>
                  <td>{bom.createdDate}</td>
                  <td>
                    <button className="action-button">
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="new-bom-prompt">
        <p>Click the button above to create a new Bill of Materials</p>
      </div>
    </div>
    </>
  );
};

export default BomList;