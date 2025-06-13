import React, { useState, useEffect } from 'react';
import { FiChevronDown, FiCalendar, FiUser, FiPackage, FiList, FiSettings } from 'react-icons/fi';
import TopNavbar from './TopNavbar';
import "./ManufacturingOrderCreate.css";

const ManufacturingOrderCreate = () => {
  const [formData, setFormData] = useState({
    orderId: '',
    productId: '',
    quantity: 1,
    uom: '',
    startDate: '',
    endDate: '',
    responsiblePerson: '',
    bomId: '',
    routingId: ''
  });

  const [products, setProducts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [boms, setBoms] = useState([]);
  const [routings, setRoutings] = useState([]);
  const [bomComponents, setBomComponents] = useState([]);
  const [routingOperations, setRoutingOperations] = useState([]);

  const [loading, setLoading] = useState({
    products: false,
    employees: false,
    boms: false,
    routings: false
  });

  useEffect(() => {
    setLoading(prev => ({...prev, products: true}));
    setTimeout(() => {
      setProducts([
        { id: 'prod1', name: 'Product A', uom: 'pcs' },
        { id: 'prod2', name: 'Product B', uom: 'kg' },
        { id: 'prod3', name: 'Product C', uom: 'm' }
      ]);
      setLoading(prev => ({...prev, products: false}));
    }, 500);

    setLoading(prev => ({...prev, employees: true}));
    setTimeout(() => {
      setEmployees([
        { id: 'emp1', name: 'John Smith' },
        { id: 'emp2', name: 'Sarah Johnson' },
        { id: 'emp3', name: 'Michael Brown' }
      ]);
      setLoading(prev => ({...prev, employees: false}));
    }, 500);
  }, []);

  useEffect(() => {
    if (formData.productId) {
      setLoading(prev => ({...prev, boms: true}));
      setTimeout(() => {
        setBoms([
          { id: 'bom1', name: `BOM for ${formData.productId} - v1` },
          { id: 'bom2', name: `BOM for ${formData.productId} - v2` }
        ]);
        setLoading(prev => ({...prev, boms: false}));
      }, 500);
    } else {
      setBoms([]);
      setFormData(prev => ({...prev, bomId: ''}));
    }
  }, [formData.productId]);

  useEffect(() => {
    if (formData.productId) {
      setLoading(prev => ({...prev, routings: true}));
      setTimeout(() => {
        setRoutings([
          { id: 'route1', name: `Routing for ${formData.productId} - Standard` },
          { id: 'route2', name: `Routing for ${formData.productId} - Express` }
        ]);
        setLoading(prev => ({...prev, routings: false}));
      }, 500);
    } else {
      setRoutings([]);
      setFormData(prev => ({...prev, routingId: ''}));
    }
  }, [formData.productId]);

  useEffect(() => {
    if (formData.bomId) {
      setTimeout(() => {
        setBomComponents([
          { id: 'comp1', name: 'Component X', quantity: 2 * formData.quantity, uom: 'pcs' },
          { id: 'comp2', name: 'Component Y', quantity: 1 * formData.quantity, uom: 'kg' },
          { id: 'comp3', name: 'Component Z', quantity: 3 * formData.quantity, uom: 'm' }
        ]);
      }, 300);
    } else {
      setBomComponents([]);
    }
  }, [formData.bomId, formData.quantity]);

  useEffect(() => {
    if (formData.routingId) {
      setTimeout(() => {
        setRoutingOperations([
          { id: 'op1', sequence: 1, name: 'Cutting', workCenter: 'WC-101', duration: 30 },
          { id: 'op2', sequence: 2, name: 'Assembly', workCenter: 'WC-205', duration: 45 },
          { id: 'op3', sequence: 3, name: 'Finishing', workCenter: 'WC-310', duration: 20 }
        ]);
      }, 300);
    } else {
      setRoutingOperations([]);
    }
  }, [formData.routingId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));

    if (name === 'productId') {
      const selectedProduct = products.find(p => p.id === value);
      setFormData(prev => ({
        ...prev,
        productId: value,
        uom: selectedProduct ? selectedProduct.uom : ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Manufacturing Order Created Successfully!');
  };

  return (
    <>
      <TopNavbar />
      <div className="mo-container">
        <div className="mo-header">
          <h1>Create Manufacturing Order</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="mo-form">
          <div className="mo-section">
            <div className="mo-section-title">
              <FiPackage className="mo-icon" />
              <h2>Basic Information</h2>
            </div>
            
            <div className="mo-form-grid">
              <div className="mo-form-group">
                <label>MO ID</label>
                <div className="mo-input-prefix">
                  <span>MO-</span>
                  <input
                    type="text"
                    name="orderId"
                    value={formData.orderId}
                    onChange={handleChange}
                    placeholder="20230001"
                  />
                </div>
              </div>
              
              <div className="mo-form-group">
                <label>Product <span className="mo-required">*</span></label>
                <div className="mo-select">
                  <select
                    name="productId"
                    value={formData.productId}
                    onChange={handleChange}
                    required
                    disabled={loading.products}
                  >
                    <option value="">Select product</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                  </select>
                  <FiChevronDown className="mo-select-arrow" />
                </div>
                {loading.products && <div className="mo-loading">Loading products...</div>}
              </div>
              
              <div className="mo-form-group">
                <label>Quantity <span className="mo-required">*</span></label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>
              
              <div className="mo-form-group">
                <label>Unit</label>
                <input
                  type="text"
                  name="uom"
                  value={formData.uom}
                  readOnly
                  className="mo-readonly"
                />
              </div>
              
              <div className="mo-form-group">
                <label>Start Date</label>
                <div className="mo-date-input">
                  <FiCalendar className="mo-date-icon" />
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="mo-form-group">
                <label>End Date</label>
                <div className="mo-date-input">
                  <FiCalendar className="mo-date-icon" />
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="mo-form-group">
                <label>Responsible</label>
                <div className="mo-select">
                  <FiUser className="mo-select-icon" />
                  <select
                    name="responsiblePerson"
                    value={formData.responsiblePerson}
                    onChange={handleChange}
                    disabled={loading.employees}
                  >
                    <option value="">Select person</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>{emp.name}</option>
                    ))}
                  </select>
                  <FiChevronDown className="mo-select-arrow" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mo-section">
            <div className="mo-section-title">
              <FiList className="mo-icon" />
              <h2>Bill of Materials</h2>
            </div>
            
            <div className="mo-form-group">
              <label>BOM</label>
              <div className="mo-select">
                <select
                  name="bomId"
                  value={formData.bomId}
                  onChange={handleChange}
                  disabled={!formData.productId || loading.boms}
                >
                  <option value="">Select BOM</option>
                  {boms.map(bom => (
                    <option key={bom.id} value={bom.id}>{bom.name}</option>
                  ))}
                </select>
                <FiChevronDown className="mo-select-arrow" />
              </div>
              {loading.boms && <div className="mo-loading">Loading BOMs...</div>}
            </div>
            
            {bomComponents.length > 0 && (
              <div className="mo-table-container">
                <div className="mo-table-header">
                  <h3>Components</h3>
                  <span className="mo-badge">{bomComponents.length} items</span>
                </div>
                <table className="mo-table">
                  <thead>
                    <tr>
                      <th>Component</th>
                      <th>Quantity</th>
                      <th>Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bomComponents.map(comp => (
                      <tr key={comp.id}>
                        <td>
                          <div className="mo-component">
                            <span className="mo-bullet"></span>
                            {comp.name}
                          </div>
                        </td>
                        <td>{comp.quantity}</td>
                        <td><span className="mo-unit">{comp.uom}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          <div className="mo-section">
            <div className="mo-section-title">
              <FiSettings className="mo-icon" />
              <h2>Routing</h2>
            </div>
            
            <div className="mo-form-group">
              <label>Routing</label>
              <div className="mo-select">
                <select
                  name="routingId"
                  value={formData.routingId}
                  onChange={handleChange}
                  disabled={!formData.productId || loading.routings}
                >
                  <option value="">Select routing</option>
                  {routings.map(route => (
                    <option key={route.id} value={route.id}>{route.name}</option>
                  ))}
                </select>
                <FiChevronDown className="mo-select-arrow" />
              </div>
              {loading.routings && <div className="mo-loading">Loading routings...</div>}
            </div>
            
            {routingOperations.length > 0 && (
              <div className="mo-table-container">
                <div className="mo-table-header">
                  <h3>Operations</h3>
                  <span className="mo-badge">{routingOperations.length} steps</span>
                </div>
                <table className="mo-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Operation</th>
                      <th>Work Center</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {routingOperations.map(op => (
                      <tr key={op.id}>
                        <td><span className="mo-sequence">{op.sequence}</span></td>
                        <td>{op.name}</td>
                        <td><span className="mo-workcenter">{op.workCenter}</span></td>
                        <td>{op.duration} min</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          <div className="mo-actions">
            <button type="button" className="mo-btn mo-btn-secondary">
              Cancel
            </button>
            <button type="submit" className="mo-btn mo-btn-primary">
              Create Order
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ManufacturingOrderCreate;