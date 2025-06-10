const mongoose = require('mongoose');

const manufacturingOrderSchema = new mongoose.Schema({
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  bomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bom', required: true },
  routing: { type: String, required: true },
  status: { type: String, enum: ['Planned', 'In Progress', 'Completed', 'Cancelled'], default: 'Planned' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ManufacturingOrder', manufacturingOrderSchema);
