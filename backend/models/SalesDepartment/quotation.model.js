// const mongoose = require("mongoose");

// const QuotationSchema = new mongoose.Schema({
//   quotationNumber: { type: String, required: true, unique: true },
//   date: { type: Date, required: true, default: Date.now },
//   expiryDate: { type: Date, required: true },
//   customerName: { type: String, required: true },
//   salesperson: { type: String, required: true },
//   paymentTerms: { 
//     type: String, 
//     enum: ["7 days", "15 days", "30 days"], 
//     required: true 
//   },
//   products: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
//       quantity: { type: Number, required: true, min: 1 }
//     }
//   ],
//   additionalNotes: { type: String }
// });

// module.exports = mongoose.model("Quotation", QuotationSchema);


// Snehal's Backend Code

// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   quantity: { type: Number, required: true },
//   unitPrice: { type: Number, required: true },
//   total: { type: Number, required: true }, // quantity * unitPrice
// });

// const quotationSchema = new mongoose.Schema({
//   quotationNumber: { type: String, required: true, unique: true },
//   date: { type: String, required: true },
//   expiryDate: { type: String, required: true },
//   customerName: { type: String, required: true },
//   salesperson: { type: String, required: true },
//   paymentTerms: { type: String },
//   status: {
//     type: String,
//     enum: ["draft", "sent", "accepted", "expired", "rejected"],
//     default: "draft",
//   },
//   products: [productSchema],
//   totalAmount: { type: Number, required: true },
// });

// module.exports = mongoose.model("Quotation", quotationSchema);



// Snehal's Updated Code

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: { type: String }, // Since you have a product ID field in the frontend
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  total: { type: Number, required: true }, // quantity * unitPrice
});

const quotationSchema = new mongoose.Schema({
  quotationNumber: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  expiryDate: { type: String, required: true },
  customer: { type: String, required: true }, // match frontend key
  salesperson: { type: String, required: true },
  paymentTerms: { type: String },

  status: {
    type: String,
    enum: ["draft", "sent", "accepted", "expired", "rejected"],
    default: "draft",
  },

  products: [productSchema],

  subtotal: { type: Number, required: true },
  discount: { type: Number, required: true },
  tax: { type: Number, required: true },
  total: { type: Number, required: true }, // final total after discount + tax
  notes: { type: String },
});

module.exports = mongoose.model("Quotation", quotationSchema);
