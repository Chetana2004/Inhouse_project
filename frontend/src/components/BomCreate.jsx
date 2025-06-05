// import React, { useState } from 'react';
// import './BomCreate.css';
// import TopNavbar from './TopNavbar';

// const BomCreate = () => {
//   const [bomData, setBomData] = useState({
//     productName: '',
//     quantity: '',
//     productVersion: '',
//     notes: '',
//     bomType: '',
//     items: []
//   });

//   const [newItem, setNewItem] = useState({
//     itemCode: '',
//     item: '',
//     quantity: '',
//     unit: '',
//     unitPrice: '',
//     subTotal: ''
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setBomData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleItemInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewItem(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const addItem = () => {
//     if (newItem.itemCode && newItem.item) {
//       setBomData(prev => ({
//         ...prev,
//         items: [...prev.items, newItem]
//       }));
//       setNewItem({
//         itemCode: '',
//         item: '',
//         quantity: '',
//         unit: '',
//         unitPrice: '',
//         subTotal: ''
//       });
//     }
//   };

//   const removeItem = (index) => {
//     setBomData(prev => ({
//       ...prev,
//       items: prev.items.filter((_, i) => i !== index)
//     }));
//   };

//   return (
//     <>
//     <TopNavbar/>
//     <div className="bom-container">
//       <header className="bom-header">
//         <h1>Create BoM</h1>
//         <div className="header-actions">
//           <div className="bom-type-selector">
//             <label>BOM Type</label>
//             <select 
//               name="bomType" 
//               value={bomData.bomType} 
//               onChange={handleInputChange}
//               className="bom-type-select"
//             >
//               <option value="">Select BOM type</option>
//               <option value="manufacturing">Manufacturing</option>
//               <option value="engineering">Engineering</option>
//               <option value="sales">Sales</option>
//             </select>
//           </div>
//           <button className="bom-new-btn">New BOM</button>
//         </div>
//       </header>

//       <div className="bom-form-section">
//         <div className="form-row">
//           <div className="form-group">
//             <label>Product Name</label>
//             <input 
//               type="text" 
//               name="productName" 
//               value={bomData.productName} 
//               onChange={handleInputChange} 
//               placeholder="Enter product name" 
//             />
//           </div>
//           <div className="form-group">
//             <label>Quantity</label>
//             <input 
//               type="text" 
//               name="quantity" 
//               value={bomData.quantity} 
//               onChange={handleInputChange} 
//               placeholder="Enter quantity" 
//             />
//           </div>
//         </div>
        
//         <div className="form-row">
//           <div className="form-group">
//             <label>Product Version</label>
//             <input 
//               type="text" 
//               name="productVersion" 
//               value={bomData.productVersion} 
//               onChange={handleInputChange} 
//               placeholder="Enter product version" 
//             />
//           </div>
//           <div className="form-group">
//             <label>Notes</label>
//             <textarea 
//               name="notes" 
//               value={bomData.notes} 
//               onChange={handleInputChange} 
//               placeholder="Enter notes" 
//               rows="3"
//             />
//           </div>
//         </div>
//       </div>
      
//       <div className="bom-items-section">
//         <div className="section-header">
//           <h2>Items</h2>
//           <div className="table-actions">
//             <span className="item-count">{bomData.items.length} items</span>
//           </div>
//         </div>

//         <div className="table-container">
//           <table className="bom-items-table">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Item Code</th>
//                 <th>Item</th>
//                 <th>Quantity</th>
//                 <th>Unit</th>
//                 <th>Unit Price</th>
//                 <th>Sub Total</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bomData.items.length > 0 ? (
//                 bomData.items.map((item, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td className="item-code">{item.itemCode}</td>
//                     <td>{item.item}</td>
//                     <td>{item.quantity}</td>
//                     <td>{item.unit}</td>
//                     <td className="numeric">${item.unitPrice}</td>
//                     <td className="numeric">${item.subTotal}</td>
//                     <td>
//                       <button 
//                         onClick={() => removeItem(index)}
//                         className="remove-btn"
//                       >
//                         × Remove
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr className="empty-row">
//                   <td colSpan="8">No items added yet</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
        
//         <div className="add-item-section">
//           <h3>Add New Item</h3>
//           <div className="add-item-form">
//             <input 
//               type="text" 
//               name="itemCode" 
//               value={newItem.itemCode} 
//               onChange={handleItemInputChange} 
//               placeholder="Item Code" 
//             />
//             <input 
//               type="text" 
//               name="item" 
//               value={newItem.item} 
//               onChange={handleItemInputChange} 
//               placeholder="Item Name" 
//             />
//             <input 
//               type="number" 
//               name="quantity" 
//               value={newItem.quantity} 
//               onChange={handleItemInputChange} 
//               placeholder="Qty" 
//               min="1"
//             />
//             <select
//               name="unit"
//               value={newItem.unit}
//               onChange={handleItemInputChange}
//             >
//               <option value="">Unit</option>
//               <option value="pcs">Pieces</option>
//               <option value="kg">Kilograms</option>
//               <option value="m">Meters</option>
//               <option value="l">Liters</option>
//             </select>
//             <input 
//               type="number" 
//               name="unitPrice" 
//               value={newItem.unitPrice} 
//               onChange={handleItemInputChange} 
//               placeholder="Unit Price" 
//               min="0"
//               step="0.01"
//             />
//             <input 
//               type="number" 
//               name="subTotal" 
//               value={newItem.subTotal} 
//               onChange={handleItemInputChange} 
//               placeholder="Sub Total" 
//               min="0"
//               step="0.01"
//             />
//             <button onClick={addItem} className="add-item-btn">
//               + Add Item
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default BomCreate;









import React, { useState, useEffect } from 'react';
import './BomCreate.css';
import TopNavbar from './TopNavbar';

const BomCreate = () => {
  const [bomData, setBomData] = useState({
    productName: '',
    quantity: '',
    productVersion: '',
    notes: '',
    bomType: '',
    items: []
  });

  const [newItem, setNewItem] = useState({
    itemCode: '',
    item: '',
    quantity: '',
    unit: '',
    unitPrice: '',
    subTotal: ''
  });

  // Auto-calculate subTotal when quantity or unitPrice changes
  useEffect(() => {
    const quantity = parseFloat(newItem.quantity) || 0;
    const unitPrice = parseFloat(newItem.unitPrice) || 0;
    const subTotal = (quantity * unitPrice).toFixed(2);
    setNewItem(prev => ({ ...prev, subTotal }));
  }, [newItem.quantity, newItem.unitPrice]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBomData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addItem = () => {
    if (newItem.itemCode && newItem.item && newItem.quantity && newItem.unitPrice) {
      setBomData(prev => ({
        ...prev,
        items: [...prev.items, newItem]
      }));
      setNewItem({
        itemCode: '',
        item: '',
        quantity: '',
        unit: '',
        unitPrice: '',
        subTotal: ''
      });
    } else {
      alert('Please fill out all required fields for the item.');
    }
  };

  const removeItem = (index) => {
    setBomData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    if (!bomData.productName || !bomData.quantity || !bomData.bomType) {
      alert('Please fill all mandatory fields (Product Name, Quantity, BOM Type).');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/bom/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bomData)
      });

      if (response.ok) {
        alert('BoM created successfully!');
        setBomData({
          productName: '',
          quantity: '',
          productVersion: '',
          notes: '',
          bomType: '',
          items: []
        });
      } else {
        const err = await response.json();
        alert('Failed to create BoM: ' + err.message);
      }
    } catch (error) {
      alert('Error submitting data: ' + error.message);
    }
  };

  return (
    <>
      <TopNavbar />
      <div className="bom-container">
        <header className="bom-header">
          <h1>Create BoM</h1>
          <div className="header-actions">
            <div className="bom-type-selector">
              <label>BOM Type</label>
              <select 
                name="bomType" 
                value={bomData.bomType} 
                onChange={handleInputChange}
                className="bom-type-select"
              >
                <option value="">Select BOM type</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="engineering">Engineering</option>
                <option value="sales">Sales</option>
              </select>
            </div>
          </div>
        </header>

        <div className="bom-form-section">
          <div className="form-row">
            <div className="form-group">
              <label>Product Name</label>
              <input 
                type="text" 
                name="productName" 
                value={bomData.productName} 
                onChange={handleInputChange} 
                placeholder="Enter product name" 
              />
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input 
                type="number" 
                name="quantity" 
                value={bomData.quantity} 
                onChange={handleInputChange} 
                placeholder="Enter quantity" 
                min="1"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Product Version</label>
              <input 
                type="text" 
                name="productVersion" 
                value={bomData.productVersion} 
                onChange={handleInputChange} 
                placeholder="Enter product version" 
              />
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea 
                name="notes" 
                value={bomData.notes} 
                onChange={handleInputChange} 
                placeholder="Enter notes" 
                rows="3"
              />
            </div>
          </div>
        </div>
        
        <div className="bom-items-section">
          <div className="section-header">
            <h2>Items</h2>
            <div className="table-actions">
              <span className="item-count">{bomData.items.length} items</span>
            </div>
          </div>

          <div className="table-container">
            <table className="bom-items-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item Code</th>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Unit Price</th>
                  <th>Sub Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bomData.items.length > 0 ? (
                  bomData.items.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="item-code">{item.itemCode}</td>
                      <td>{item.item}</td>
                      <td>{item.quantity}</td>
                      <td>{item.unit}</td>
                      <td className="numeric">${item.unitPrice}</td>
                      <td className="numeric">${item.subTotal}</td>
                      <td>
                        <button 
                          onClick={() => removeItem(index)}
                          className="remove-btn"
                        >
                          × Remove
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="empty-row">
                    <td colSpan="8">No items added yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="add-item-section">
            <h3>Add New Item</h3>
            <div className="add-item-form">
              <input 
                type="text" 
                name="itemCode" 
                value={newItem.itemCode} 
                onChange={handleItemInputChange} 
                placeholder="Item Code" 
              />
              <input 
                type="text" 
                name="item" 
                value={newItem.item} 
                onChange={handleItemInputChange} 
                placeholder="Item Name" 
              />
              <input 
                type="number" 
                name="quantity" 
                value={newItem.quantity} 
                onChange={handleItemInputChange} 
                placeholder="Qty" 
                min="1"
              />
              <select
                name="unit"
                value={newItem.unit}
                onChange={handleItemInputChange}
              >
                <option value="">Unit</option>
                <option value="pcs">Pieces</option>
                <option value="kg">Kilograms</option>
                <option value="m">Meters</option>
                <option value="l">Liters</option>
              </select>
              <input 
                type="number" 
                name="unitPrice" 
                value={newItem.unitPrice} 
                onChange={handleItemInputChange} 
                placeholder="Unit Price" 
                min="0"
                step="0.01"
              />
              <input 
                type="number" 
                name="subTotal" 
                value={newItem.subTotal} 
                readOnly 
                placeholder="Sub Total" 
              />
              <button onClick={addItem} className="add-item-btn">
                + Add Item
              </button>
            </div>
          </div>
        </div>

        {/* Submit BOM button */}
        <div className="submit-bom-section">
          <button className="submit-bom-btn" onClick={handleSubmit}>
            ✅ Create BOM
          </button>
        </div>
      </div>
    </>
  );
};

export default BomCreate;
