//Code is fully working !!

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./GenerateQuotation.css";
import SendQuotationEmail from "./SendQuotationEmail";

const GenerateQuotation = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [quotationData, setQuotationData] = useState({
    quotationNumber: "QT-" + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toISOString().split("T")[0],
    customer: "",
    salesperson: "",
    paymentTerms: "7 days",
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    notes: "",
    status: "draft",
  });

  const [products, setProducts] = useState([
    { id: "P1", name: "", quantity: 1, unitPrice: 0, total: 0 },
  ]);

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = products.reduce((sum, product) => sum + product.total, 0);
  const total = subtotal - discount + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuotationData({ ...quotationData, [name]: value });
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [name]:
        name === "quantity" || name === "unitPrice"
          ? parseFloat(value) || 0
          : value,
    };

    if (name === "quantity" || name === "unitPrice") {
      updatedProducts[index].total =
        updatedProducts[index].quantity * updatedProducts[index].unitPrice;
    }

    setProducts(updatedProducts);
  };

  const addProduct = () => {
    setProducts([
      ...products,
      {
        id: `P${products.length + 1}`,
        name: "",
        quantity: 1,
        unitPrice: 0,
        total: 0,
      },
    ]);
  };

  const removeProduct = (index) => {
    if (products.length > 1) {
      const updatedProducts = [...products];
      updatedProducts.splice(index, 1);
      setProducts(updatedProducts);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (
      !quotationData.customer ||
      products.some((p) => !p.name || p.quantity <= 0 || p.unitPrice < 0)
    ) {
      alert("Please fill all required fields with valid values");
      setIsSubmitting(false);
      return;
    }

    const quotation = {
      ...quotationData,
      products: products.map((p) => ({
        ...p,
        quantity: Number(p.quantity),
        unitPrice: Number(p.unitPrice),
        total: Number(p.total),
      })),
      subtotal: Number(subtotal.toFixed(2)),
      discount: Number(discount.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      total: Number(total.toFixed(2)),
    };

    try {
      let response;
      if (id) {
        // Update existing quotation
        response = await axios.put(
          `http://localhost:5000/quotation/${id}`,
          quotation
        );
      } else {
        // Create new quotation
        response = await axios.post(
          "http://localhost:5000/quotation/create",
          quotation
        );
      }

      if (response.status === 200 || response.status === 201) {
        navigate("/quotations");
      }
    } catch (error) {
      console.error("Error saving quotation:", error);
      alert("Failed to save quotation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (id) {
      // Fetch quotation for editing
      axios
        .get(`http://localhost:5000/quotation/${id}`)
        .then((response) => {
          const data = response.data;
          setQuotationData({
            quotationNumber: data.quotationNumber,
            date: data.date,
            expiryDate: data.expiryDate,
            customer: data.customer,
            salesperson: data.salesperson,
            paymentTerms: data.paymentTerms,
            notes: data.notes || "",
            status: data.status,
          });
          setProducts(data.products || []);
          setDiscount(data.discount || 0);
          setTax(data.tax || 0);
        })
        .catch((err) => console.error("Error fetching quotation:", err));
    }
  }, [id]);

  return (
    <div className="quotation-container">
      <h1>{id ? "Edit Quotation" : "Generate Quotation"}</h1>

      <form onSubmit={handleSubmit}>
        <div className="quotation-header">
          <div className="form-group">
            <label>Quotation Number</label>
            <input
              type="text"
              name="quotationNumber"
              value={quotationData.quotationNumber}
              readOnly
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={quotationData.date}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={quotationData.expiryDate}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="customer-details">
          <div className="form-group">
            <label>Customer Name</label>
            <input
              type="text"
              name="customer"
              value={quotationData.customer}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Salesperson</label>
            <input
              type="text"
              name="salesperson"
              value={quotationData.salesperson}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Payment Terms</label>
            <select
              name="paymentTerms"
              value={quotationData.paymentTerms}
              onChange={handleInputChange}
            >
              <option value="7 days">7 days</option>
              <option value="15 days">15 days</option>
              <option value="30 days">30 days</option>
              <option value="60 days">60 days</option>
            </select>
          </div>
        </div>

        <div className="products-section">
          <h3>Products/Services</h3>
          <table className="products-table">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price (₹)</th>
                <th>Total (₹)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      name="id"
                      value={product.id}
                      onChange={(e) => handleProductChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={product.name}
                      onChange={(e) => handleProductChange(index, e)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="quantity"
                      value={product.quantity}
                      onChange={(e) => handleProductChange(index, e)}
                      min="1"
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="unitPrice"
                      value={product.unitPrice}
                      onChange={(e) => handleProductChange(index, e)}
                      min="0"
                      step="0.01"
                      required
                    />
                  </td>
                  <td>₹{product.total.toFixed(2)}</td>
                  <td>
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeProduct(index)}
                      disabled={products.length <= 1}
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            className="add-product-btn"
            onClick={addProduct}
          >
            + Add Product
          </button>
        </div>

        <div className="totals-section">
          <div className="total-row">
            <span>Subtotal:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="total-row">
            <span>
              Discount:
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                min="0"
                step="0.01"
              />
            </span>
            <span>- ₹{discount.toFixed(2)}</span>
          </div>
          <div className="total-row">
            <span>
              Tax (%):
              <input
                type="number"
                value={tax}
                onChange={(e) => setTax(parseFloat(e.target.value) || 0)}
                min="0"
                step="0.01"
              />
            </span>
            <span>+ ₹{tax.toFixed(2)}</span>
          </div>
          <div className="total-row grand-total">
            <span>Total Amount:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        <div className="form-group notes">
          <label>Additional Notes</label>
          <textarea
            name="notes"
            value={quotationData.notes}
            onChange={handleInputChange}
            rows="3"
          />
        </div>

        {showEmailModal && (
          <SendQuotationEmail
            quotationData={quotationData}
            onClose={() => setShowEmailModal(false)}
          />
        )}

        <div className="action-buttons">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/quotations")}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="generate-btn"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Processing..."
              : id
              ? "Update Quotation"
              : "Generate Quotation"}
          </button>
          {!id && (
            <button
              type="button"
              className="send-btn"
              onClick={() => setShowEmailModal(true)}
              disabled={isSubmitting}
            >
              Send over email
            </button>
          )}
        </div>
      </form>

      {showEmailModal && (
        <SendQuotationEmail
          quotationData={{
            ...quotationData,
            products,
            subtotal,
            discount,
            tax,
            total,
          }}
          onClose={() => setShowEmailModal(false)}
        />
      )}
    </div>
  );
};

export default GenerateQuotation;
