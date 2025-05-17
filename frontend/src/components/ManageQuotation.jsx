//Code is fully working!!

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ManageQuotation.css";
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from "react-icons/fi";

const ManageQuotation = () => {
  const navigate = useNavigate();
  const [quotations, setQuotations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/quotation/get");
        setQuotations(res.data);
      } catch (err) {
        setError("Failed to fetch quotations");
        console.error("Failed to fetch quotations", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotations();
  }, []);

  const handleGenerateNew = () => {
    navigate("/generate-quotation");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this quotation?")) {
      try {
        await axios.delete(`http://localhost:5000/quotation/${id}`);
        setQuotations((prev) => prev.filter((q) => q._id !== id));
      } catch (err) {
        console.error("Failed to delete quotation", err);
        alert("Failed to delete quotation");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/generate-quotation/${id}`);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      draft: "badge-draft",
      sent: "badge-sent",
      accepted: "badge-accepted",
      expired: "badge-expired",
      rejected: "badge-rejected",
    };
    return (
      <span className={`status-badge ${statusClasses[status]}`}>{status}</span>
    );
  };

  const filteredQuotations = quotations.filter((quote) => {
    const matchesSearch =
      quote.quotationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (quote.customer &&
        quote.customer.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus =
      statusFilter === "all" || quote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1 className="title">Manage Quotations</h1>
          <button className="create-btn" onClick={handleGenerateNew}>
            <FiPlus /> New Quotation
          </button>
        </div>

        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search quotations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="accepted">Accepted</option>
            <option value="expired">Expired</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>Quotation ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Expiry</th>
              <th>Amount (₹)</th>
              <th>Status</th>
              <th>Salesperson</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="loading-cell">
                  Loading quotations...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="8" className="error-cell">
                  {error}
                </td>
              </tr>
            ) : filteredQuotations.length > 0 ? (
              filteredQuotations.map((quotation) => (
                <tr key={quotation._id}>
                  <td>{quotation.quotationNumber}</td>
                  <td>{quotation.customer}</td>
                  <td>{quotation.date}</td>
                  <td>{quotation.expiryDate}</td>
                  <td>₹{quotation.total?.toFixed(2)}</td>
                  <td>{getStatusBadge(quotation.status)}</td>
                  <td>{quotation.salesperson}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-btn edit-btn"
                        onClick={() => handleEdit(quotation._id)}
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(quotation._id)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-orders">
                  No quotations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageQuotation;
