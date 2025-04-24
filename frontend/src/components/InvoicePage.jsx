// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./InvoicePage.css";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// const InvoicePage = () => {
//   const navigate = useNavigate();
//   const [showEmailPopup, setShowEmailPopup] = useState(false);
//   const [recipientEmail, setRecipientEmail] = useState("");
//   const defaultEmail = "company@example.com";
//   const [invoicePDF, setInvoicePDF] = useState("");

//   // Form state
//   const [invoiceData, setInvoiceData] = useState({
//     invoiceNumber: "INV-" + Math.floor(1000 + Math.random() * 9000),
//     date: new Date().toISOString().split("T")[0],
//     dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
//       .toISOString()
//       .split("T")[0],
//     customer: "",
//     salesperson: "",
//     paymentTerms: "30 days",
//     status: "To Invoice",
//     notes: "",
//   });

//   // Products state
//   const [products, setProducts] = useState([
//     {
//       id: "P001",
//       name: "",
//       quantity: 1,
//       unitPrice: 0,
//       downPayment: 0,
//       total: 0,
//     },
//   ]);

//   // Calculations
//   const subtotal = products.reduce((sum, product) => sum + product.total, 0);
//   const [discount, setDiscount] = useState(0);
//   const [tax, setTax] = useState(0);
//   const total = subtotal - discount + tax;

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setInvoiceData({ ...invoiceData, [name]: value });
//   };

//   // Handle product changes
//   const handleProductChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedProducts = [...products];
//     updatedProducts[index] = {
//       ...updatedProducts[index],
//       [name]:
//         name === "quantity" || name === "unitPrice" || name === "downPayment"
//           ? parseFloat(value) || 0
//           : value,
//     };

//     // Auto-calculate total
//     if (name === "quantity" || name === "unitPrice") {
//       updatedProducts[index].total =
//         updatedProducts[index].quantity * updatedProducts[index].unitPrice;
//     }

//     setProducts(updatedProducts);
//   };

//   // Add new product row
//   const addProduct = () => {
//     setProducts([
//       ...products,
//       {
//         id: `P00${products.length + 1}`,
//         name: "",
//         quantity: 1,
//         unitPrice: 0,
//         downPayment: 0,
//         total: 0,
//       },
//     ]);
//   };

//   // Remove product row
//   const removeProduct = (index) => {
//     if (products.length > 1) {
//       const updatedProducts = [...products];
//       updatedProducts.splice(index, 1);
//       setProducts(updatedProducts);
//     }
//   };

//   // Generate PDF
//   const generatePDF = () => {
//     const doc = new jsPDF();
//     doc.text(`Invoice ${invoiceData.invoiceNumber}`, 20, 20);
//     doc.text(`Invoice Date: ${invoiceData.date}`, 20, 30);
//     doc.text(`Due Date: ${invoiceData.dueDate}`, 20, 40);
//     doc.text(`Customer: ${invoiceData.customer}`, 20, 50);
//     doc.text(`Salesperson: ${invoiceData.salesperson}`, 20, 60);
//     doc.text(`Payment Terms: ${invoiceData.paymentTerms}`, 20, 70);
//     doc.text(`Invoice Status: ${invoiceData.status}`, 20, 80);

//     autoTable(doc, {
//       startY: 90,
//       head: [
//         [
//           "Product ID",
//           "Product",
//           "Quantity",
//           "Unit Price",
//           "Total",
//           "Down Payment",
//         ],
//       ],
//       body: products.map((product) => [
//         product.id,
//         product.name,
//         product.quantity,
//         `Rs.${product.unitPrice.toFixed(2)}`,
//         `Rs.${product.total.toFixed(2)}`,
//         `Rs.${product.downPayment.toFixed(2)}`,
//       ]),
//     });

//     doc.text(
//       `Subtotal: Rs. ${subtotal.toFixed(2)}`,
//       20,
//       doc.lastAutoTable.finalY + 10
//     );
//     doc.text(
//       `Discount: Rs. ${discount.toFixed(2)}`,
//       20,
//       doc.lastAutoTable.finalY + 20
//     );
//     doc.text(`Tax: Rs. ${tax.toFixed(2)}`, 20, doc.lastAutoTable.finalY + 30);
//     doc.text(
//       `Total: Rs. ${total.toFixed(2)}`,
//       20,
//       doc.lastAutoTable.finalY + 40
//     );

//     if (invoiceData.notes) {
//       doc.text(
//         `Notes: ${invoiceData.notes}`,
//         20,
//         doc.lastAutoTable.finalY + 60
//       );
//     }

//     const pdfBlob = doc.output("bloburl");
//     setInvoicePDF(pdfBlob);
//   };

//   const handleSendEmail = () => {
//     // Validate required fields
//     if (!invoiceData.customer || products.some((p) => !p.name)) {
//       alert(
//         "Please fill in all required fields (customer and all product names)"
//       );
//       return;
//     }
//     generatePDF();
//     setShowEmailPopup(true);
//   };

//   const handleClosePopup = () => {
//     setShowEmailPopup(false);
//   };

//   const handleSend = () => {
//     alert(`Invoice sent from ${defaultEmail} to ${recipientEmail}`);
//     setShowEmailPopup(false);
//   };

//   const handleSave = () => {
//     // Validate required fields
//     if (!invoiceData.customer || products.some((p) => !p.name)) {
//       alert(
//         "Please fill in all required fields (customer and all product names)"
//       );
//       return;
//     }
//     alert("Invoice saved successfully!");
//     // Here you would typically send the data to your backend
//   };

//   return (
//     <div className="container">
//       <div className="invoice-box">
//         <header className="invoice-header">
//           <h1>Invoice {invoiceData.invoiceNumber}</h1>
//           <div className="invoice-info">
//             <div className="form-group">
//               <label>Invoice Date</label>
//               <input
//                 type="date"
//                 name="date"
//                 value={invoiceData.date}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="form-group">
//               <label>Due Date</label>
//               <input
//                 type="date"
//                 name="dueDate"
//                 value={invoiceData.dueDate}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>
//         </header>

//         <section className="invoice-details">
//           <div className="form-group">
//             <label>Customer</label>
//             <input
//               type="text"
//               name="customer"
//               value={invoiceData.customer}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Salesperson</label>
//             <input
//               type="text"
//               name="salesperson"
//               value={invoiceData.salesperson}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Payment Terms</label>
//             <select
//               name="paymentTerms"
//               value={invoiceData.paymentTerms}
//               onChange={handleInputChange}
//             >
//               <option value="7 days">7 days</option>
//               <option value="15 days">15 days</option>
//               <option value="30 days">30 days</option>
//               <option value="60 days">60 days</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Status</label>
//             <select
//               name="status"
//               value={invoiceData.status}
//               onChange={handleInputChange}
//             >
//               <option value="To Invoice">To Invoice</option>
//               <option value="Sent">Sent</option>
//               <option value="Paid">Paid</option>
//               <option value="Cancelled">Cancelled</option>
//             </select>
//           </div>
//         </section>

//         <table className="invoice-table">
//           <thead>
//             <tr>
//               <th>Product ID</th>
//               <th>Product</th>
//               <th>Quantity</th>
//               <th>Unit Price</th>
//               <th>Total</th>
//               <th>Down Payment</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product, index) => (
//               <tr key={index}>
//                 <td>
//                   <input
//                     type="text"
//                     name="id"
//                     value={product.id}
//                     onChange={(e) => handleProductChange(index, e)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     name="name"
//                     value={product.name}
//                     onChange={(e) => handleProductChange(index, e)}
//                     required
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="number"
//                     name="quantity"
//                     value={product.quantity}
//                     onChange={(e) => handleProductChange(index, e)}
//                     min="1"
//                     required
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="number"
//                     name="unitPrice"
//                     value={product.unitPrice}
//                     onChange={(e) => handleProductChange(index, e)}
//                     min="0"
//                     step="0.01"
//                     required
//                   />
//                 </td>
//                 <td>Rs.{product.total.toFixed(2)}</td>
//                 <td>
//                   <input
//                     type="number"
//                     name="downPayment"
//                     value={product.downPayment}
//                     onChange={(e) => handleProductChange(index, e)}
//                     min="0"
//                     step="0.01"
//                   />
//                 </td>
//                 <td>
//                   <button
//                     type="button"
//                     className="remove-btn"
//                     onClick={() => removeProduct(index)}
//                     disabled={products.length <= 1}
//                   >
//                     ×
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button type="button" className="add-product-btn" onClick={addProduct}>
//           + Add Product
//         </button>

//         <div className="invoice-summary">
//           <div className="summary-row">
//             <span>Subtotal:</span>
//             <span>Rs.{subtotal.toFixed(2)}</span>
//           </div>
//           <div className="summary-row">
//             <span>
//               Discount:
//               <input
//                 type="number"
//                 value={discount}
//                 onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
//                 min="0"
//                 step="0.01"
//               />
//             </span>
//             <span>- Rs.{discount.toFixed(2)}</span>
//           </div>
//           <div className="summary-row">
//             <span>
//               Tax:
//               <input
//                 type="number"
//                 value={tax}
//                 onChange={(e) => setTax(parseFloat(e.target.value) || 0)}
//                 min="0"
//                 step="0.01"
//               />
//             </span>
//             <span>+ Rs.{tax.toFixed(2)}</span>
//           </div>
//           <div className="summary-row total">
//             <span>Total Amount:</span>
//             <span>Rs.{total.toFixed(2)}</span>
//           </div>
//         </div>

//         <div className="form-group notes">
//           <label>Additional Notes</label>
//           <textarea
//             name="notes"
//             value={invoiceData.notes}
//             onChange={handleInputChange}
//             rows="3"
//           />
//         </div>

//         <div className="invoice-actions">
//           <button className="btn cancel" onClick={() => navigate("/orders")}>
//             Cancel
//           </button>
//           <button className="btn save" onClick={handleSave}>
//             Save
//           </button>
//           <button className="btn email" onClick={handleSendEmail}>
//             Send over email
//           </button>
//         </div>
//       </div>

//       {showEmailPopup && (
//         <div className="email-popup">
//           <div className="popup-content">
//             <h2>Send Invoice</h2>
//             <label>Sender Email:</label>
//             <input type="email" value={defaultEmail} disabled />
//             <label>Recipient Email:</label>
//             <input
//               type="email"
//               value={recipientEmail}
//               onChange={(e) => setRecipientEmail(e.target.value)}
//               placeholder="Enter recipient email"
//               required
//             />
//             <label>Attached File:</label>
//             {invoicePDF && (
//               <a
//                 href={invoicePDF}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 download={`Invoice_${invoiceData.invoiceNumber}.pdf`}
//               >
//                 View Invoice (PDF)
//               </a>
//             )}
//             <div className="popup-buttons">
//               <button onClick={handleSend}>Send</button>
//               <button onClick={handleClosePopup}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InvoicePage;










// Correct Invoice Page - using axios (Snehal Code Design)

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./InvoicePage.css";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import axios from "axios";

// const InvoicePage = () => {
//   const navigate = useNavigate();
//   const [showEmailPopup, setShowEmailPopup] = useState(false);
//   const [recipientEmail, setRecipientEmail] = useState("");
//   const defaultEmail = "company@example.com";
//   const [invoicePDF, setInvoicePDF] = useState("");

//   // Form state
//   const [invoiceData, setInvoiceData] = useState({
//     invoiceNumber: "INV-" + Math.floor(1000 + Math.random() * 9000),
//     date: new Date().toISOString().split("T")[0],
//     dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
//       .toISOString()
//       .split("T")[0],
//     customer: "",
//     salesperson: "",
//     paymentTerms: "30 days",
//     status: "To Invoice",
//     notes: "",
//   });

//   // Products state
//   const [products, setProducts] = useState([
//     {
//       id: "P001",
//       name: "",
//       quantity: 1,
//       unitPrice: 0,
//       downPayment: 0,
//       total: 0,
//     },
//   ]);

//   // Calculations
//   const subtotal = products.reduce((sum, product) => sum + product.total, 0);
//   const [discount, setDiscount] = useState(0);
//   const [tax, setTax] = useState(0);
//   const total = subtotal - discount + tax;

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setInvoiceData({ ...invoiceData, [name]: value });
//   };

//   // Handle product changes
//   const handleProductChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedProducts = [...products];
//     updatedProducts[index] = {
//       ...updatedProducts[index],
//       [name]:
//         name === "quantity" || name === "unitPrice" || name === "downPayment"
//           ? parseFloat(value) || 0
//           : value,
//     };

//     // Auto-calculate total
//     if (name === "quantity" || name === "unitPrice") {
//       updatedProducts[index].total =
//         updatedProducts[index].quantity * updatedProducts[index].unitPrice;
//     }

//     setProducts(updatedProducts);
//   };

//   // Add new product row
//   const addProduct = () => {
//     setProducts([
//       ...products,
//       {
//         id: `P00${products.length + 1}`,
//         name: "",
//         quantity: 1,
//         unitPrice: 0,
//         downPayment: 0,
//         total: 0,
//       },
//     ]);
//   };

//   // Remove product row
//   const removeProduct = (index) => {
//     if (products.length > 1) {
//       const updatedProducts = [...products];
//       updatedProducts.splice(index, 1);
//       setProducts(updatedProducts);
//     }
//   };

//   // Generate PDF
//   const generatePDF = () => {
//     const doc = new jsPDF();
//     doc.text(`Invoice ${invoiceData.invoiceNumber}`, 20, 20);
//     doc.text(`Invoice Date: ${invoiceData.date}`, 20, 30);
//     doc.text(`Due Date: ${invoiceData.dueDate}`, 20, 40);
//     doc.text(`Customer: ${invoiceData.customer}`, 20, 50);
//     doc.text(`Salesperson: ${invoiceData.salesperson}`, 20, 60);
//     doc.text(`Payment Terms: ${invoiceData.paymentTerms}`, 20, 70);
//     doc.text(`Invoice Status: ${invoiceData.status}`, 20, 80);

//     autoTable(doc, {
//       startY: 90,
//       head: [
//         [
//           "Product ID",
//           "Product",
//           "Quantity",
//           "Unit Price",
//           "Total",
//           "Down Payment",
//         ],
//       ],
//       body: products.map((product) => [
//         product.id,
//         product.name,
//         product.quantity,
//         `Rs.${product.unitPrice.toFixed(2)}`,
//         `Rs.${product.total.toFixed(2)}`,
//         `Rs.${product.downPayment.toFixed(2)}`,
//       ]),
//     });

//     doc.text(
//       `Subtotal: Rs. ${subtotal.toFixed(2)}`,
//       20,
//       doc.lastAutoTable.finalY + 10
//     );
//     doc.text(
//       `Discount: Rs. ${discount.toFixed(2)}`,
//       20,
//       doc.lastAutoTable.finalY + 20
//     );
//     doc.text(`Tax: Rs. ${tax.toFixed(2)}`, 20, doc.lastAutoTable.finalY + 30);
//     doc.text(
//       `Total: Rs. ${total.toFixed(2)}`,
//       20,
//       doc.lastAutoTable.finalY + 40
//     );

//     if (invoiceData.notes) {
//       doc.text(
//         `Notes: ${invoiceData.notes}`,
//         20,
//         doc.lastAutoTable.finalY + 60
//       );
//     }

//     const pdfBlob = doc.output("bloburl");
//     setInvoicePDF(pdfBlob);
//   };

//   const handleSendEmail = () => {
//     // Validate required fields
//     if (!invoiceData.customer || products.some((p) => !p.name)) {
//       alert(
//         "Please fill in all required fields (customer and all product names)"
//       );
//       return;
//     }
//     generatePDF();
//     setShowEmailPopup(true);
//   };

//   const handleClosePopup = () => {
//     setShowEmailPopup(false);
//   };

//   const handleSend = () => {
//     alert(`Invoice sent from ${defaultEmail} to ${recipientEmail}`);
//     setShowEmailPopup(false);
//   };

//   const handleSave = async () => {
//     // Validate required fields
//     if (!invoiceData.customer || products.some((p) => !p.name)) {
//       alert(
//         "Please fill in all required fields (customer and all product names)"
//       );
//       return;
//     }

//     // Prepare data to send to the backend
//     const invoiceDataToSend = {
//       ...invoiceData,
//       products,
//       subtotal,
//       discount,
//       tax,
//       total,
//     };

//     try {
//       await axios.post("http://localhost:5000/invoice/create", invoiceDataToSend);
//       alert("Invoice saved successfully!");
//       navigate("/invoices");  // Redirect to invoices page or wherever needed
//     } catch (error) {
//       console.error("Error saving invoice:", error);
//       alert("Error saving invoice");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="invoice-box">
//         <header className="invoice-header">
//           <h1>Invoice {invoiceData.invoiceNumber}</h1>
//           <div className="invoice-info">
//             <div className="form-group">
//               <label>Invoice Date</label>
//               <input
//                 type="date"
//                 name="date"
//                 value={invoiceData.date}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="form-group">
//               <label>Due Date</label>
//               <input
//                 type="date"
//                 name="dueDate"
//                 value={invoiceData.dueDate}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>
//         </header>

//         <section className="invoice-details">
//           <div className="form-group">
//             <label>Customer</label>
//             <input
//               type="text"
//               name="customer"
//               value={invoiceData.customer}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Salesperson</label>
//             <input
//               type="text"
//               name="salesperson"
//               value={invoiceData.salesperson}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Payment Terms</label>
//             <select
//               name="paymentTerms"
//               value={invoiceData.paymentTerms}
//               onChange={handleInputChange}
//             >
//               <option value="7 days">7 days</option>
//               <option value="15 days">15 days</option>
//               <option value="30 days">30 days</option>
//               <option value="60 days">60 days</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Status</label>
//             <select
//               name="status"
//               value={invoiceData.status}
//               onChange={handleInputChange}
//             >
//               <option value="To Invoice">To Invoice</option>
//               <option value="Sent">Sent</option>
//               <option value="Paid">Paid</option>
//               <option value="Cancelled">Cancelled</option>
//             </select>
//           </div>
//         </section>

//         <table className="invoice-table">
//           <thead>
//             <tr>
//               <th>Product ID</th>
//               <th>Product</th>
//               <th>Quantity</th>
//               <th>Unit Price</th>
//               <th>Total</th>
//               <th>Down Payment</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product, index) => (
//               <tr key={index}>
//                 <td>
//                   <input
//                     type="text"
//                     name="id"
//                     value={product.id}
//                     onChange={(e) => handleProductChange(index, e)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     name="name"
//                     value={product.name}
//                     onChange={(e) => handleProductChange(index, e)}
//                     required
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="number"
//                     name="quantity"
//                     value={product.quantity}
//                     onChange={(e) => handleProductChange(index, e)}
//                     min="1"
//                     required
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="number"
//                     name="unitPrice"
//                     value={product.unitPrice}
//                     onChange={(e) => handleProductChange(index, e)}
//                     min="0"
//                     step="0.01"
//                     required
//                   />
//                 </td>
//                 <td>Rs.{product.total.toFixed(2)}</td>
//                 <td>
//                   <input
//                     type="number"
//                     name="downPayment"
//                     value={product.downPayment}
//                     onChange={(e) => handleProductChange(index, e)}
//                     min="0"
//                     step="0.01"
//                   />
//                 </td>
//                 <td>
//                   <button
//                     type="button"
//                     className="remove-btn"
//                     onClick={() => removeProduct(index)}
//                     disabled={products.length <= 1}
//                   >
//                     ×
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button type="button" className="add-product-btn" onClick={addProduct}>
//           + Add Product
//         </button>

//         <div className="invoice-summary">
//           <div className="summary-row">
//             <span>Subtotal:</span>
//             <span>Rs.{subtotal.toFixed(2)}</span>
//           </div>
//           <div className="summary-row">
//             <span>
//               Discount:
//               <input
//                 type="number"
//                 value={discount}
//                 onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
//                 min="0"
//                 step="0.01"
//               />
//             </span>
//             <span>- Rs.{discount.toFixed(2)}</span>
//           </div>
//           <div className="summary-row">
//             <span>
//               Tax:
//               <input
//                 type="number"
//                 value={tax}
//                 onChange={(e) => setTax(parseFloat(e.target.value) || 0)}
//                 min="0"
//                 step="0.01"
//               />
//             </span>
//             <span>+ Rs.{tax.toFixed(2)}</span>
//           </div>
//           <div className="summary-row total">
//             <span>Total Amount:</span>
//             <span>Rs.{total.toFixed(2)}</span>
//           </div>
//         </div>

//         <div className="form-group notes">
//           <label>Additional Notes</label>
//           <textarea
//             name="notes"
//             value={invoiceData.notes}
//             onChange={handleInputChange}
//             rows="3"
//           />
//         </div>

//         <div className="invoice-actions">
//           <button className="btn cancel" onClick={() => navigate("/orders")}>
//             Cancel
//           </button>
//           <button className="btn save" onClick={handleSave}>
//             Save
//           </button>
//           <button className="btn email" onClick={handleSendEmail}>
//             Send Email
//           </button>
//         </div>
//       </div>

//       {showEmailPopup && (
//         <div className="email-popup">
//           <div className="popup-content">
//             <h3>Send Invoice to Email</h3>
//             <label>Recipient Email</label>
//             <input
//               type="email"
//               value={recipientEmail}
//               onChange={(e) => setRecipientEmail(e.target.value)}
//               placeholder={defaultEmail}
//             />
//             <div className="popup-actions">
//               <button className="btn close" onClick={handleClosePopup}>
//                 Close
//               </button>
//               <button className="btn send" onClick={handleSend}>
//                 Send
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InvoicePage;




// DeepSeek Code
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./InvoicePage.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import { FiSend, FiSave, FiX, FiPlus, FiTrash2, FiPrinter } from "react-icons/fi";

const InvoicePage = () => {
  const navigate = useNavigate();
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");
  const defaultEmail = "company@example.com";
  const [invoicePDF, setInvoicePDF] = useState("");

  // Form state
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "INV-" + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    customer: "",
    salesperson: "",
    paymentTerms: "30 days",
    status: "To Invoice",
    notes: "",
  });

  // Products state
  const [products, setProducts] = useState([
    {
      id: "P001",
      name: "",
      quantity: 1,
      unitPrice: 0,
      downPayment: 0,
      total: 0,
    },
  ]);

  // Calculations
  const subtotal = products.reduce((sum, product) => sum + product.total, 0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const total = subtotal - discount + tax;

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  // Handle product changes
  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [name]:
        name === "quantity" || name === "unitPrice" || name === "downPayment"
          ? parseFloat(value) || 0
          : value,
    };

    // Auto-calculate total
    if (name === "quantity" || name === "unitPrice") {
      updatedProducts[index].total =
        updatedProducts[index].quantity * updatedProducts[index].unitPrice;
    }

    setProducts(updatedProducts);
  };

  // Add new product row
  const addProduct = () => {
    setProducts([
      ...products,
      {
        id: `P00${products.length + 1}`,
        name: "",
        quantity: 1,
        unitPrice: 0,
        downPayment: 0,
        total: 0,
      },
    ]);
  };

  // Remove product row
  const removeProduct = (index) => {
    if (products.length > 1) {
      const updatedProducts = [...products];
      updatedProducts.splice(index, 1);
      setProducts(updatedProducts);
    }
  };

  // Generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Header with logo and company info
    doc.setFontSize(20);
    doc.setTextColor(33, 37, 41);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE", 105, 25, { align: "center" });
    
    doc.setFontSize(12);
    doc.setTextColor(73, 80, 87);
    doc.setFont("helvetica", "normal");
    doc.text(`Invoice #: ${invoiceData.invoiceNumber}`, 105, 32, { align: "center" });
    
    // Company info
    doc.setFontSize(12);
    doc.setTextColor(33, 37, 41);
    doc.text("Your Company Name", 20, 25);
    doc.setFontSize(10);
    doc.text("123 Business Street", 20, 31);
    doc.text("City, State 10001", 20, 37);
    doc.text("Phone: (123) 456-7890", 20, 43);
    doc.text("Email: company@example.com", 20, 49);
    
    // Invoice details
    doc.setFontSize(12);
    doc.setTextColor(33, 37, 41);
    doc.text(`Invoice Date: ${invoiceData.date}`, 140, 50);
    doc.text(`Due Date: ${invoiceData.dueDate}`, 140, 56);
    doc.text(`Customer: ${invoiceData.customer}`, 140, 62);
    doc.text(`Salesperson: ${invoiceData.salesperson}`, 140, 68);
    doc.text(`Payment Terms: ${invoiceData.paymentTerms}`, 140, 74);
    doc.text(`Status: ${invoiceData.status}`, 140, 80);

    // Products table
    autoTable(doc, {
      startY: 90,
      head: [
        [
          { content: "Product ID", styles: { fillColor: [44, 62, 80], textColor: [255, 255, 255], fontStyle: 'bold' } },
          { content: "Product", styles: { fillColor: [44, 62, 80], textColor: [255, 255, 255], fontStyle: 'bold' } },
          { content: "Qty", styles: { fillColor: [44, 62, 80], textColor: [255, 255, 255], fontStyle: 'bold' } },
          { content: "Unit Price", styles: { fillColor: [44, 62, 80], textColor: [255, 255, 255], fontStyle: 'bold' } },
          { content: "Total", styles: { fillColor: [44, 62, 80], textColor: [255, 255, 255], fontStyle: 'bold' } },
          { content: "Down Payment", styles: { fillColor: [44, 62, 80], textColor: [255, 255, 255], fontStyle: 'bold' } },
        ],
      ],
      body: products.map((product) => [
        product.id,
        product.name,
        product.quantity,
        { content: `Rs.${product.unitPrice.toFixed(2)}`, styles: { halign: 'right', fontStyle: 'bold' } },
        { content: `Rs.${product.total.toFixed(2)}`, styles: { halign: 'right', fontStyle: 'bold' } },
        { content: `Rs.${product.downPayment.toFixed(2)}`, styles: { halign: 'right', fontStyle: 'bold' } },
      ]),
      styles: {
        cellPadding: 6,
        fontSize: 11,
        valign: 'middle',
        textColor: [33, 37, 41],
      },
      headStyles: {
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [248, 249, 250]
      },
      margin: { top: 10 },
    });

    // Summary section
    const finalY = doc.lastAutoTable.finalY + 20;
    
    doc.setFontSize(12);
    doc.setTextColor(33, 37, 41);
    doc.text(
      `Subtotal: Rs. ${subtotal.toFixed(2)}`,
      140,
      finalY,
      { align: "right" }
    );
    doc.text(
      `Discount: Rs. ${discount.toFixed(2)}`,
      140,
      finalY + 8,
      { align: "right" }
    );
    doc.text(
      `Tax: Rs. ${tax.toFixed(2)}`,
      140,
      finalY + 16,
      { align: "right" }
    );
    
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(
      `Total: Rs. ${total.toFixed(2)}`,
      140,
      finalY + 28,
      { align: "right" }
    );
    
    // Notes section
    if (invoiceData.notes) {
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(
        `Notes: ${invoiceData.notes}`,
        20,
        finalY + 40,
        { maxWidth: 170 }
      );
    }
    
    // Footer
    doc.setFontSize(9);
    doc.setTextColor(108, 117, 125);
    doc.text(
      "Thank you for your business!",
      105,
      280,
      { align: "center" }
    );

    const pdfBlob = doc.output("bloburl");
    setInvoicePDF(pdfBlob);
    return doc;
  };

  const handlePrint = () => {
    const pdf = generatePDF();
    pdf.autoPrint();
    window.open(pdf.output('bloburl'), '_blank');
  };

  const handleSendEmail = () => {
    if (!invoiceData.customer || products.some((p) => !p.name)) {
      alert(
        "Please fill in all required fields (customer and all product names)"
      );
      return;
    }
    generatePDF();
    setShowEmailPopup(true);
  };

  const handleClosePopup = () => {
    setShowEmailPopup(false);
  };

  const handleSend = () => {
    alert(`Invoice sent from ${defaultEmail} to ${recipientEmail}`);
    setShowEmailPopup(false);
  };

  const handleSave = async () => {
    if (!invoiceData.customer || products.some((p) => !p.name)) {
      alert(
        "Please fill in all required fields (customer and all product names)"
      );
      return;
    }

    const invoiceDataToSend = {
      ...invoiceData,
      products,
      subtotal,
      discount,
      tax,
      total,
    };

    try {
      await axios.post("http://localhost:5000/invoice/create", invoiceDataToSend);
      alert("Invoice saved successfully!");
      navigate("/invoices");
    } catch (error) {
      console.error("Error saving invoice:", error);
      alert("Error saving invoice");
    }
  };

  return (
    <div className="invoice-container">
      <div className="invoice-box">
        <header className="invoice-header">
          <div className="invoice-title">
            <h1>Invoice {invoiceData.invoiceNumber}</h1>
            <div className="invoice-status">
              <span className={`status-badge ${invoiceData.status.toLowerCase().replace(' ', '-')}`}>
                {invoiceData.status}
              </span>
            </div>
          </div>
          <div className="invoice-info">
            <div className="form-group">
              <label>Invoice Date</label>
              <input
                type="date"
                name="date"
                value={invoiceData.date}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={invoiceData.dueDate}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
          </div>
        </header>

        <section className="invoice-details">
          <div className="form-row">
            <div className="form-group">
              <label>Customer <span className="required">*</span></label>
              <input
                type="text"
                name="customer"
                value={invoiceData.customer}
                onChange={handleInputChange}
                className="form-control"
                required
                placeholder="Enter customer name"
              />
            </div>
            <div className="form-group">
              <label>Salesperson</label>
              <input
                type="text"
                name="salesperson"
                value={invoiceData.salesperson}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Payment Terms</label>
              <select
                name="paymentTerms"
                value={invoiceData.paymentTerms}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="7 days">7 days</option>
                <option value="15 days">15 days</option>
                <option value="30 days">30 days</option>
                <option value="60 days">60 days</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={invoiceData.status}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="To Invoice">To Invoice</option>
                <option value="Sent">Sent</option>
                <option value="Paid">Paid</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </section>

        <div className="products-section">
          <div className="section-header">
            <h3>Products/Services</h3>
            <button 
              type="button" 
              className="btn btn-add-product"
              onClick={addProduct}
            >
              <FiPlus /> Add Product
            </button>
          </div>
          
          <div className="table-responsive">
            <table className="invoice-table">
              <thead>
                <tr>
                  <th width="12%">Product ID</th>
                  <th width="25%">Product <span className="required">*</span></th>
                  <th width="10%">Qty</th>
                  <th width="15%">Unit Price</th>
                  <th width="15%">Total</th>
                  <th width="15%">Down Payment</th>
                  <th width="8%">Action</th>
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
                        className="form-control"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={(e) => handleProductChange(index, e)}
                        className="form-control"
                        required
                        placeholder="Product/service name"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="quantity"
                        value={product.quantity}
                        onChange={(e) => handleProductChange(index, e)}
                        min="1"
                        className="form-control"
                        required
                      />
                    </td>
                    <td>
                      <div className="input-group">
                        <span className="input-group-text">Rs.</span>
                        <input
                          type="number"
                          name="unitPrice"
                          value={product.unitPrice}
                          onChange={(e) => handleProductChange(index, e)}
                          min="0"
                          step="0.01"
                          className="form-control"
                          required
                        />
                      </div>
                    </td>
                    <td className="amount-cell">
                      Rs.{product.total.toFixed(2)}
                    </td>
                    <td>
                      <div className="input-group">
                        <span className="input-group-text">Rs.</span>
                        <input
                          type="number"
                          name="downPayment"
                          value={product.downPayment}
                          onChange={(e) => handleProductChange(index, e)}
                          min="0"
                          step="0.01"
                          className="form-control"
                        />
                      </div>
                    </td>
                    <td className="action-cell">
                      <button
                        type="button"
                        className="btn btn-remove"
                        onClick={() => removeProduct(index)}
                        disabled={products.length <= 1}
                        title="Remove product"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="invoice-summary">
          <div className="summary-grid">
            <div className="summary-row">
              <label>Subtotal:</label>
              <div className="amount">Rs.{subtotal.toFixed(2)}</div>
            </div>
            <div className="summary-row">
              <label>
                Discount:
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.01"
                  className="form-control discount-input"
                />
              </label>
              <div className="amount negative">- Rs.{discount.toFixed(2)}</div>
            </div>
            <div className="summary-row">
              <label>
                Tax:
                <input
                  type="number"
                  value={tax}
                  onChange={(e) => setTax(parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.01"
                  className="form-control tax-input"
                />
              </label>
              <div className="amount">+ Rs.{tax.toFixed(2)}</div>
            </div>
            <div className="summary-row total-row">
              <label>Total Amount:</label>
              <div className="amount total-amount">Rs.{total.toFixed(2)}</div>
            </div>
          </div>
        </div>

        <div className="form-group notes">
          <label>Additional Notes</label>
          <textarea
            name="notes"
            value={invoiceData.notes}
            onChange={handleInputChange}
            rows="3"
            className="form-control"
            placeholder="Any additional information or terms..."
          />
        </div>

        <div className="invoice-actions">
          <button className="btn btn-secondary" onClick={() => navigate("/orders")}>
            Cancel
          </button>
          <div className="action-group">
            <button className="btn btn-primary" onClick={handleSave}>
              <FiSave /> Save Invoice
            </button>
            <button className="btn btn-print" onClick={handlePrint}>
              <FiPrinter /> Print
            </button>
            <button className="btn btn-success" onClick={handleSendEmail}>
              <FiSend /> Send Email
            </button>
          </div>
        </div>
      </div>

      {showEmailPopup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Send Invoice</h3>
              <button className="modal-close" onClick={handleClosePopup}>
                <FiX />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>From</label>
                <input
                  type="email"
                  value={defaultEmail}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>To <span className="required">*</span></label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="form-control"
                  placeholder="recipient@example.com"
                  required
                />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  value={`Invoice ${invoiceData.invoiceNumber}`}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  className="form-control"
                  rows="4"
                  defaultValue={`Dear Customer,\n\nPlease find attached invoice #${invoiceData.invoiceNumber} for your records.\n\nThank you for your business!\n\nBest regards,\nYour Company`}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleClosePopup}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSend}>
                <FiSend /> Send Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicePage;