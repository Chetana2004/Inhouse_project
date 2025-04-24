import React, { useState } from 'react';
import './ManufacturingOrderUnbuild.css';
import TopNavbar from './TopNavbar';

const ManufacturingOrderUnbuild = () => {
  const [orderId, setOrderId] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Unbuild request submitted:', { orderId, reason });
      setIsSubmitting(false);
      setSuccessMessage('Unbuild request submitted successfully!');
      setOrderId('');
      setReason('');
      
      // Hide success message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000);
    }, 1500);
  };

  return (
    <>
    <TopNavbar/>
    <div className="unbuild-order-container">
      <div className="unbuild-order-card">
        <h1 className="unbuild-order-title">Unbuild Order</h1>
        <p className="unbuild-order-subtitle">
          Submit a request to unbuild an existing order. Please provide the required details below.
        </p>
        
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="unbuild-order-form">
          <div className="form-group">
            <label htmlFor="orderId" className="form-label">
              Order ID *
            </label>
            <input
              type="text"
              id="orderId"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="form-input"
              placeholder="Enter order ID"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="reason" className="form-label">
              Reason for Unbuild *
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="form-textarea"
              placeholder="Please explain why you need to unbuild this order"
              rows="4"
              required
            />
          </div>
          
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Submit Unbuild Request'}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default ManufacturingOrderUnbuild;
