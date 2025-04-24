// const express = require("express");
// const { createOrder, getOrders } = require("../../controller/SalesDepartment/order.controller");
// const router = express.Router();

// router.post("/create", createOrder);
// router.get("/get", getOrders);
// // router.get("/:id", getQuotationById);
// // router.put("/:id", updateQuotation);
// // router.delete("/:id", deleteQuotation);

// module.exports = router;




// Snehals Backend Code
const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/SalesDepartment/order.controller");

router.post("/create", orderController.createOrder);
router.get("/get", orderController.getAllOrders);
router.get("/:orderNumber", orderController.getOrderByOrderNumber); // Fixed name
router.put("/:orderNumber/status", orderController.updateOrderStatus); // Included the optional status update
router.get("/", orderController.getAllOrders);

module.exports = router;
