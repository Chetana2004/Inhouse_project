// const express = require('express');
// const router = express.Router();
// const {
//   createManufacturingOrder,
//   getAllManufacturingOrders,
//   getManufacturingOrderById,
//   updateManufacturingOrderStatus,
//   deleteManufacturingOrder
// } = require('../../controllers/ProductionDepartment/manufacturingController');

// // Routes
// router.post('/create', createManufacturingOrder);
// router.get('/list', getAllManufacturingOrders);
// router.get('/:id', getManufacturingOrderById);
// router.put('update/:id/status', updateManufacturingOrderStatus);
// router.delete('delete/:id', deleteManufacturingOrder);

// module.exports = router;


------------------------------------------

  
const express = require('express');
const router = express.Router();
const {
  createManufacturingOrder,
  getAllManufacturingOrders,
  getManufacturingOrderById,
  updateManufacturingOrderStatus,
  deleteManufacturingOrder,
  scrapOrder,
  unbuildOrder
} = require('../../controllers/ProductionDepartment/manufacturingController');

// Manufacturing Order Routes
router.post('/create', createManufacturingOrder);
router.get('/list', getAllManufacturingOrders);
router.get('/:id', getManufacturingOrderById);
router.put('/update/:id/status', updateManufacturingOrderStatus);
router.delete('/delete/:id', deleteManufacturingOrder);

// ✅ Scrap & Unbuild Routes
router.put('/scrap/:id', scrapOrder);
router.put('/unbuild/:id', unbuildOrder);

module.exports = router;
