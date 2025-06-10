// routes/workcenterRoutes.js
const express = require('express');
const router = express.Router();
const {
  createWorkCenter,
  getAllWorkCenters,
  getWorkCenterById,
  deleteWorkCenter
} = require('../../controllers/ProductionDepartment/workcenterController');

// POST /workcenter
router.post('/create', createWorkCenter);

// GET /workcenter
router.get('/list', getAllWorkCenters);

// DELETE /workcenter/:id
router.delete('/:id', deleteWorkCenter);

module.exports = router;
