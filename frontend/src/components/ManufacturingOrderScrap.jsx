import React, { useState } from 'react';
import './ManufacturingOrderScrap.css';
import TopNavbar from './TopNavbar';

const ManufacturingOrderScrap = () => {
  const [formData, setFormData] = useState({
    orderId: '',
    conveyorType: '',
    serialNumber: '',
    scrapReason: 'defective',
    quantity: 1,
    notes: '',
    approvalRequired: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Scrap order submitted:', formData);
      setIsSubmitting(false);
      setSuccessMessage('Scrap order submitted successfully!');
      
      // Reset form
      setFormData({
        orderId: '',
        conveyorType: '',
        serialNumber: '',
        scrapReason: 'defective',
        quantity: 1,
        notes: '',
        approvalRequired: true
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000);
    }, 1500);
  };

  return (
    <>
    <TopNavbar/>
    <div className="scrap-order-container">
      <div className="scrap-order-card">
        <div className="scrap-order-header">
          <h1 className="scrap-order-title">Scrap Order</h1>
          <p className="scrap-order-subtitle">
            Record conveyor components or assemblies that need to be scrapped
          </p>
        </div>
        
        {successMessage && (
          <div className="success-message">
            <span className="success-icon">✓</span> {successMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="scrap-order-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="orderId" className="form-label">
                Manufacturing Order ID *
              </label>
              <input
                type="text"
                id="orderId"
                name="orderId"
                value={formData.orderId}
                onChange={handleChange}
                className="form-input"
                placeholder="MO-XXXXXX"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="conveyorType" className="form-label">
                Conveyor Type *
              </label>
              <select
                id="conveyorType"
                name="conveyorType"
                value={formData.conveyorType}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select conveyor type</option>
                <option value="belt">Belt Conveyor</option>
                <option value="roller">Roller Conveyor</option>
                <option value="chain">Chain Conveyor</option>
                <option value="screw">Screw Conveyor</option>
                <option value="pneumatic">Pneumatic Conveyor</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="serialNumber" className="form-label">
                Serial Number
              </label>
              <input
                type="text"
                id="serialNumber"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                className="form-input"
                placeholder="SN-XXXXXX"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="quantity" className="form-label">
                Quantity *
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                value={formData.quantity}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="scrapReason" className="form-label">
              Scrap Reason *
            </label>
            <select
              id="scrapReason"
              name="scrapReason"
              value={formData.scrapReason}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="defective">Defective Material</option>
              <option value="damaged">Damaged in Production</option>
              <option value="obsolete">Obsolete Design</option>
              <option value="excess">Excess Inventory</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="notes" className="form-label">
              Additional Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Add any additional details about the scrap..."
              rows="3"
            />
          </div>
          
          <div className="form-checkbox-group">
            <input
              type="checkbox"
              id="approvalRequired"
              name="approvalRequired"
              checked={formData.approvalRequired}
              onChange={handleChange}
              className="form-checkbox"
            />
            <label htmlFor="approvalRequired" className="form-checkbox-label">
              Requires supervisor approval
            </label>
          </div>
          
          <div className="form-actions">
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span> Processing...
                </>
              ) : (
                'Submit Scrap Order'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default ManufacturingOrderScrap;