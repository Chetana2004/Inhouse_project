const Routing = require("../../models/ProductionDepartment/routingModel");

// Create new routing
exports.createRouting = async (req, res) => {
  try {
    const newRouting = new Routing(req.body);
    await newRouting.save();
    res.status(201).json({ message: "Routing created successfully", routing: newRouting });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all routings
exports.getAllRoutings = async (req, res) => {
  try {
    const routings = await Routing.find();
    res.status(200).json(routings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single routing by ID
exports.getRoutingById = async (req, res) => {
  try {
    const routing = await Routing.findById(req.params.id);
    if (!routing) return res.status(404).json({ message: "Routing not found" });
    res.status(200).json(routing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update routing
exports.updateRouting = async (req, res) => {
  try {
    const updated = await Routing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete routing
exports.deleteRouting = async (req, res) => {
  try {
    await Routing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Routing deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
