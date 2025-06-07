const mongoose = require("mongoose");

const operationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  workCenter: { type: String, required: true },
  duration: { type: String, required: true }, // in minutes, as string (e.g. "30")
  sequence: { type: String, required: true },
  allowOverlap: { type: Boolean, default: false },
  blockingTime: { type: String, required: true },
  cost: { type: String, required: true }
});

const routingSchema = new mongoose.Schema(
  {
    routingName: { type: String, required: true },
    code: { type: String, required: true },
    associatedProduct: { type: String, required: true },
    operations: [operationSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Routing", routingSchema);
