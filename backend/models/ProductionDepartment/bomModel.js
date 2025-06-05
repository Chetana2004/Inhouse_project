const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  itemCode: { type: String, required: true },
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  subTotal: { type: Number, required: true }
});

const BomSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  productVersion: { type: String },
  notes: { type: String },
  bomType: {
    type: String,
    enum: ['manufacturing', 'engineering', 'sales'],
    required: true
  },
  items: [ItemSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bom', BomSchema);
