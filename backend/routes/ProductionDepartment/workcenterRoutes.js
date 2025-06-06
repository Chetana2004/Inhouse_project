// routes/workcenterRoutes.js
const express = require('express');
const router = express.Router();
const {
  createWorkCenter,
  getAllWorkCenters,
  getWorkCenterById
} = require('../../controllers/ProductionDepartment/workcenterController');

// POST /api/workcenters
router.post('/create', createWorkCenter);

// GET /api/workcenters
router.get('/list', getAllWorkCenters);

// GET /api/workcenters/:id
router.get('/:id', getWorkCenterById);

module.exports = router;
