// const express = require('express');
// const quotationController = require('../../controller/SalesDepartment/quotation.controller');

// const router = express.Router();

// // Route to get all quotations
// router.get('/get', quotationController.getAllQuotations);

// // Route to get a single quotation by ID
// router.get('/:id', quotationController.getQuotationById);

// // Route to create a new quotation
// router.post('/create', quotationController.createQuotation);

// // Route to update an existing quotation by ID
// router.put('/:id', quotationController.updateQuotation);

// // Route to delete a quotation by ID
// router.delete('/:id', quotationController.deleteQuotation);

// module.exports = router;





// Snehals Backend Code

const express = require("express");
const router = express.Router();
const controller = require("../../controllers/SalesDepartment/quotation.controller");

router.get("/get", controller.getAllQuotations);
router.get("/:id", controller.getQuotationById);
router.post("/create", controller.createQuotation);
router.put("/update/:id", controller.updateQuotation);
router.delete("/:id", controller.deleteQuotation);

module.exports = router;
