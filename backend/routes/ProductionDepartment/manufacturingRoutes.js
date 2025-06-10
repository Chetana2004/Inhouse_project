const express = require('express');
const router = express.Router();
const {
  createManufacturingOrder,
  getAllManufacturingOrders,
  getManufacturingOrderById,
  updateManufacturingOrderStatus,
  deleteManufacturingOrder
} = require('../../controllers/ProductionDepartment/manufacturingController');

// Routes
router.post('/create', createManufacturingOrder);
router.get('/list', getAllManufacturingOrders);
router.get('/:id', getManufacturingOrderById);
router.put('update/:id/status', updateManufacturingOrderStatus);
router.delete('delete/:id', deleteManufacturingOrder);

module.exports = router;
