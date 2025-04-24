// const mongoose = require("mongoose");

// const InvoiceSchema = new mongoose.Schema({
//   invoiceNumber: { type: String, required: true, unique: true }, // Added field
//   invoiceDate: { type: Date, required: true, default: Date.now },
//   dueDate: { type: Date, required: true },
//   customer: { type: String, required: true },
//   salesperson: { type: String, required: true },
//   paymentTerms: { 
//     type: String, 
//     enum: ["7 days", "15 days", "30 days"], 
//     required: true 
//   },
//   status: { 
//     type: String, 
//     enum: ["Pending", "Paid", "Overdue"], 
//     required: true, 
//     default: "Pending"
//   },
//   products: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
//       quantity: { type: Number, required: true, min: 1 },
//       downpayment: { type: Number, required: true, min: 0, default: 0 }
//     }
//   ]
// });

// module.exports = mongoose.model("Invoice", InvoiceSchema);





// Snehal's backend Code

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  id: String,
  name: String,
  quantity: Number,
  unitPrice: Number,
  downPayment: Number,
  total: Number,
});

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: String,
  date: String,
  dueDate: String,
  customer: String,
  salesperson: String,
  paymentTerms: String,
  status: String,
  notes: String,
  products: [ProductSchema],
  subtotal: Number,
  discount: Number,
  tax: Number,
  total: Number,
});

module.exports = mongoose.model("Invoice", InvoiceSchema);
