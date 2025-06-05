
const express = require("express");
const router = express.Router();
const bomController = require("../../controllers/ProductionDepartment/bomController");

router.post("/create", bomController.createBom);
router.get("/list", bomController.getAllBom);

module.exports = router;