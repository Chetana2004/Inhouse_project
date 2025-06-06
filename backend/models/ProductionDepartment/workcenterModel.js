// models/workcenterModel.js
const mongoose = require('mongoose');

const workCenterSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  supervisor: { type: String },
  status: {
    type: String,
    enum: ['active', 'inactive', 'maintenance'],
    default: 'active'
  },
  capacity: { type: Number },
  efficiency: { type: Number, default: 100 },
  costRate: { type: Number },
  calendar: {
    type: String,
    enum: ['default', 'shift1', 'shift2', 'continuous'],
    default: 'default'
  }
}, {
  timestamps: true
});

const WorkCenter = mongoose.model('WorkCenter', workCenterSchema);

module.exports = WorkCenter;
