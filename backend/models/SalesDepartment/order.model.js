// const mongoose = require("mongoose");

// const OrderSchema = new mongoose.Schema({
//   orderNumber: { type: String, required: true, unique: true },
//   date: { type: Date, required: true, default: Date.now },
//   customerName: { type: String, required: true },
//   //customerEmail: { type: String, required: true },
//   salesperson: { type: String, required: true },
//   paymentTerms: { 
//     type: String, 
//     enum: ["7 days", "15 days", "30 days"], 
//     required: true 
//   },
//   products: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },// removed - required:true
//       quantity: { type: Number, required: true, min: 1 }
//     }
//   ],
//   additionalNotes: { type: String },
//   customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
//   orderStatus: { type: String, enum: ["Pending", "Completed", "Cancelled"], default: "Pending" }
// });

// module.exports = mongoose.model("Order", OrderSchema);



// Snehal's Backend Code

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  unitPrice: Number,
  total: Number,
});

const OrderSchema = new mongoose.Schema({
  orderNumber: String,
  date: String,
  customer: String,
  salesperson: String,
  products: [ProductSchema],
  subtotal: Number,
  tax: Number,
  total: Number,
  status: {
    type: String,
    enum: ["To Invoice", "Invoiced", "Paid"],
    default: "To Invoice",
  },
});

module.exports = mongoose.model("Order", OrderSchema);
