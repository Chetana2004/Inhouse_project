const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/SalesDepartment/order.controller');

// Verify controller functions are available
console.log('Controller functions:', {
  createOrder: typeof orderController.createOrder,
  getAllOrders: typeof orderController.getAllOrders,
  getOrderByOrderNumber: typeof orderController.getOrderByOrderNumber
});

// Order routes
router.post('/create', orderController.createOrder);
router.get('/get', orderController.getAllOrders);
router.get('/get/:orderNumber', orderController.getOrderByOrderNumber);

// Test endpoint
router.get('/test', (req, res) => {
  res.status(200).json({ message: "Orders API is working!" });
});

module.exports = router;
