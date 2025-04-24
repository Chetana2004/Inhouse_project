// const express = require("express");
// const { authMiddleware, roleMiddleware } = require("../../middlewares/authMiddleware");
// const invoiceController = require("../../controller/SalesDepartment/invoice.controller");

// const router = express.Router();

// router.post("/create",  invoiceController.createInvoice);
// router.get("/get",  invoiceController.getInvoices);
// router.put("/:id",  invoiceController.updateInvoice);
// router.delete("/:id", invoiceController.deleteInvoice);

// module.exports = router;


// Snehals Backend Code

const express = require("express");
const router = express.Router();
const invoiceController = require("../../controllers/SalesDepartment/invoice.controller");

router.post("/create", invoiceController.createInvoice);
router.get("/get", invoiceController.getAllInvoices);

module.exports = router;
