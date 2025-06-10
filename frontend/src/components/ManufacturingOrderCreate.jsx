
// import React, { useState } from 'react';
// import './ManufacturingOrderCreate.css';
// import TopNavbar from './TopNavbar';

// const ManufacturingOrderCreate = () => {
//   const [bomOption, setBomOption] = useState('-');
//   const [routingOption, setRoutingOption] = useState('-');
  
//   const bomOptions = [
//     { value: '-', label: '-' },
//     { value: 'BOM-001', label: 'BOM-001: Standard Assembly' },
//     { value: 'BOM-002', label: 'BOM-002: Premium Components' },
//     { value: 'BOM-003', label: 'BOM-003: Rapid Production' }
//   ];
  
//   const routingOptions = [
//     { value: '-', label: '-' },
//     { value: 'RT-100', label: 'RT-100: Standard Routing' },
//     { value: 'RT-200', label: 'RT-200: Express Routing' },
//     { value: 'RT-300', label: 'RT-300: Quality Focus' }
//   ];

//   return (
//     <>
//     <TopNavbar />
//     <div className="manufacturing-order-wrapper">
//       <div className="manufacturing-order">
//         <header className="order-header">
//           <h1>Manufacturing Order</h1>
//           <div className="header-border"></div>
//         </header>

//         <div className="order-sections">
//           <section className="product-section">
//             <h2>Product</h2>
//             <div className="product-details">
//               <div className="detail-item">
//                 <label className="detail-label">BOM</label>
//                 <select 
//                   value={bomOption}
//                   onChange={(e) => setBomOption(e.target.value)}
//                   className="detail-select"
//                 >
//                   {bomOptions.map(option => (
//                     <option key={option.value} value={option.value}>
//                       {option.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="detail-item">
//                 <label className="detail-label">Routing</label>
//                 <select 
//                   value={routingOption}
//                   onChange={(e) => setRoutingOption(e.target.value)}
//                   className="detail-select"
//                 >
//                   {routingOptions.map(option => (
//                     <option key={option.value} value={option.value}>
//                       {option.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </section>

//           <section className="components-section">
//             <h2>Components</h2>
//             <table className="components-table">
//               <thead>
//                 <tr>
//                   <th>Component</th>
//                   <th>Quantity</th>
//                   <th>Available</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>Cortex</td>
//                   <td>No</td>
//                   <td className="available-yes">Yes</td>
//                 </tr>
//                 <tr>
//                   <td>Ratio</td>
//                   <td>12</td>
//                   <td className="available-no">No</td>
//                 </tr>
//                 <tr>
//                   <td>Unit</td>
//                   <td>1</td>
//                   <td className="available-yes">100</td>
//                 </tr>
//               </tbody>
//             </table>
//           </section>

//           <section className="work-order-section">
//             <h2>Work Order</h2>
//             <table className="work-order-table">
//               <thead>
//                 <tr>
//                   <th>Operation</th>
//                   <th>Work Center</th>
//                   <th>Duration</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>Getting Started</td>
//                   <td>Getting Started</td>
//                   <td>If quit</td>
//                   <td>Date</td>
//                 </tr>
//                 <tr className="in-progress">
//                   <td>Frame Assembly</td>
//                   <td>Assembly Period A</td>
//                   <td>90 min</td>
//                   <td>
//                     <span className="status-badge in-progress-badge">In Progress</span>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>Operation Name</td>
//                   <td>Work Center</td>
//                   <td>Duration</td>
//                   <td>Start</td>
//                 </tr>
//               </tbody>
//             </table>
//           </section>
//         </div>

//         <div className="action-buttons">
//           <button className="cancel-btn">Cancel</button>
//           <button className="save-btn">Save</button>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default ManufacturingOrderCreate;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './ManufacturingOrderCreate.css';
// import TopNavbar from './TopNavbar';

// const ManufacturingOrderCreate = () => {
//   const [bomList, setBomList] = useState([]);
//   const [selectedBomId, setSelectedBomId] = useState('');
//   const [selectedBom, setSelectedBom] = useState(null);

//   // Fetch all BOMs on component mount
//   useEffect(() => {
//     axios.get('http://localhost:8000/bom/list')
//       .then(res => {
//         setBomList(res.data);
//       })
//       .catch(err => {
//         console.error("Error fetching BOM list:", err);
//       });
//   }, []);

//   // Fetch BOM details on selection
//   useEffect(() => {
//     if (selectedBomId) {
//       const bom = bomList.find(b => b._id === selectedBomId);
//       setSelectedBom(bom || null);
//     }
//   }, [selectedBomId, bomList]);

//   return (
//     <>
//       <TopNavbar />
//       <div className="manufacturing-order-wrapper">
//         <div className="manufacturing-order">
//           <header className="order-header">
//             <h1>Manufacturing Order</h1>
//             <div className="header-border"></div>
//           </header>

//           <div className="order-sections">
//             <section className="product-section">
//               <h2>Select BOM</h2>
//               <div className="product-details">
//                 <div className="detail-item">
//                   <label className="detail-label">Product BOM</label>
//                   <select
//                     value={selectedBomId}
//                     onChange={(e) => setSelectedBomId(e.target.value)}
//                     className="detail-select"
//                   >
//                     <option value="">-- Select a BoM --</option>
//                     {bomList.map(bom => (
//                       <option key={bom._id} value={bom._id}>
//                         {bom.productName} (v{bom.productVersion || '1.0'})
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </section>

//             {selectedBom && (
//               <>
//                 <section className="components-section">
//                   <h2>BoM Components</h2>
//                   <table className="components-table">
//                     <thead>
//                       <tr>
//                         <th>Item Code</th>
//                         <th>Item</th>
//                         <th>Quantity</th>
//                         <th>Unit</th>
//                         <th>Unit Price</th>
//                         <th>Sub Total</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {selectedBom.items.map((item, index) => (
//                         <tr key={index}>
//                           <td>{item.itemCode}</td>
//                           <td>{item.item}</td>
//                           <td>{item.quantity}</td>
//                           <td>{item.unit}</td>
//                           <td>{item.unitPrice}</td>
//                           <td>{item.subTotal}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </section>

//                 <section className="summary-section">
//                   <h2>Summary</h2>
//                   <p><strong>Product:</strong> {selectedBom.productName}</p>
//                   <p><strong>Quantity:</strong> {selectedBom.quantity}</p>
//                   <p><strong>Version:</strong> {selectedBom.productVersion || 'N/A'}</p>
//                   <p><strong>Type:</strong> {selectedBom.bomType}</p>
//                   <p><strong>Notes:</strong> {selectedBom.notes || 'None'}</p>
//                 </section>
//               </>
//             )}
//           </div>

//           <div className="action-buttons">
//             <button className="cancel-btn">Cancel</button>
//             <button className="save-btn">Save</button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ManufacturingOrderCreate;

















import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManufacturingOrderCreate.css';
import './TopNavbar';
import TopNavbar from './TopNavbar';

const ManufacturingOrderCreate = () => {
  const [formData, setFormData] = useState({
    orderNumber: '',
    productCode: '',
    productName: '',
    quantity: 1,
    bomId: '',
    routingId: '',
    workCenterId: '',
    startDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    status: 'planned',
    priority: 'medium',
    notes: ''
  });

  const [boms, setBoms] = useState([]);
  const [routings, setRoutings] = useState([]);
  const [workCenters, setWorkCenters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bomsRes, routingsRes, workCentersRes] = await Promise.all([
          axios.get('/bom/list'),
          axios.get('/routing/list'),
          axios.get('/workcenter/list')
        ]);

        setBoms(Array.isArray(bomsRes.data) ? bomsRes.data : []);
        setRoutings(Array.isArray(routingsRes.data) ? routingsRes.data : []);
        setWorkCenters(Array.isArray(workCentersRes.data) ? workCentersRes.data : []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch required data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProductSelect = (e) => {
    const selectedBomId = e.target.value;
    const selectedBom = boms.find(bom => (bom._id || bom.id) === selectedBomId);
    if (selectedBom) {
      setFormData(prev => ({
        ...prev,
        productCode: selectedBom.productCode,
        productName: selectedBom.productName,
        bomId: selectedBom._id || selectedBom.id
      }));
    } else {
      setFormData(prev => ({ ...prev, bomId: selectedBomId }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('http://localhost:8000/manufacturing-order/create', formData);
      setSuccess(true);
      setFormData({
        orderNumber: '',
        productCode: '',
        productName: '',
        quantity: 1,
        bomId: '',
        routingId: '',
        workCenterId: '',
        startDate: new Date().toISOString().split('T')[0],
        dueDate: '',
        status: 'planned',
        priority: 'medium',
        notes: ''
      });
    } catch (err) {
      console.error('Submit error:', err);
      setError('Failed to create manufacturing order');
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setSuccess(false);
        setError(null);
      }, 3000);
    }
  };

  if (isLoading && boms.length === 0) {
    return <div className="loading">Loading data...</div>;
  }

  return (
    <>
      <TopNavbar />
    
    <div className="manufacturing-order-create">
      <h2>Create Manufacturing Order</h2>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Manufacturing order created successfully!</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Order Number</label>
          <input
            type="text"
            name="orderNumber"
            value={formData.orderNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Product</label>
          <select
            name="bomId"
            value={formData.bomId}
            onChange={handleProductSelect}
            required
          >
            <option value="">Select a product</option>
            {Array.isArray(boms) && boms.map((bom) => (
              <option key={bom._id || bom.id} value={bom._id || bom.id}>
                {bom.productName} ({bom.productCode})
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Product Code</label>
            <input type="text" name="productCode" value={formData.productCode} readOnly />
          </div>

          <div className="form-group">
            <label>Product Name</label>
            <input type="text" name="productName" value={formData.productName} readOnly />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Routing</label>
            <select
              name="routingId"
              value={formData.routingId}
              onChange={handleChange}
              required
            >
              <option value="">Select a routing</option>
              {Array.isArray(routings) && routings.map(routing => (
                <option key={routing._id || routing.id} value={routing._id || routing.id}>
                  {routing.name} (Version: {routing.version})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Work Center</label>
            <select
              name="workCenterId"
              value={formData.workCenterId}
              onChange={handleChange}
              required
            >
              <option value="">Select a work center</option>
              {Array.isArray(workCenters) && workCenters.map(wc => (
                <option key={wc._id || wc.id} value={wc._id || wc.id}>
                  {wc.name} ({wc.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className='button-container'>
              <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Manufacturing Order'}
        </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default ManufacturingOrderCreate;
