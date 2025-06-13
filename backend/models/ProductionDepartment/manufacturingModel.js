// const mongoose = require('mongoose');

// const manufacturingOrderSchema = new mongoose.Schema({
//   product: { type: String, required: true },
//   quantity: { type: Number, required: true },
//   bomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bom', required: true },
//   routing: { type: String, required: true },
//   status: { type: String, enum: ['Planned', 'In Progress', 'Completed', 'Cancelled'], default: 'Planned' },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('ManufacturingOrder', manufacturingOrderSchema);



------------------------------------------

  
const mongoose = require('mongoose');

const manufacturingOrderSchema = new mongoose.Schema({
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  bomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bom', required: true },
  routing: { type: String, required: true },

  // Extended status values
  status: {
    type: String,
    enum: ['Planned', 'In Progress', 'Completed', 'Cancelled', 'Scrapped', 'Unbuilt'],
    default: 'Planned'
  },

  // Scrap order info
  scrapDetails: {
    reason: { type: String },
    quantity: { type: Number },
    notes: { type: String },
    conveyorType: { type: String },
    serialNumber: { type: String },
    approvalRequired: { type: Boolean }
  },

  // Unbuild request info
  unbuildDetails: {
    reason: { type: String },
    requestDate: { type: Date }
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ManufacturingOrder', manufacturingOrderSchema);

