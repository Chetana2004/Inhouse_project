// controllers/workcenterController.js
const WorkCenter = require('../../models/ProductionDepartment/workcenterModel');

// Create new work center
const createWorkCenter = async (req, res) => {
  try {
    const newCenter = new WorkCenter(req.body);
    const savedCenter = await newCenter.save();
    res.status(201).json(savedCenter);
  } catch (error) {
    console.error('Create error:', error);
    res.status(400).json({ message: error.message });
  }
};

// Get all work centers
const getAllWorkCenters = async (req, res) => {
  try {
    const centers = await WorkCenter.find().sort({ createdAt: -1 });
    res.json(centers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single work center
const getWorkCenterById = async (req, res) => {
  try {
    const center = await WorkCenter.findById(req.params.id);
    if (!center) return res.status(404).json({ message: 'Not found' });
    res.json(center);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createWorkCenter,
  getAllWorkCenters,
  getWorkCenterById
};
