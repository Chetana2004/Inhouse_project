
// const express = require("express");
// const router = express.Router();
// const bomController = require("../../controllers/ProductionDepartment/bomController");

// router.post("/create", bomController.createBom);
// router.get("/list", bomController.getAllBom);

// module.exports = router;







// Updated code for the Manucturing order page

const express = require("express");
const router = express.Router();
const bomController = require("../../controllers/ProductionDepartment/bomController");

router.post("/create", bomController.createBom);
router.get("/list", bomController.getAllBom); // full data
router.get("/dropdown", bomController.getBomDropdownOptions); // dropdown-friendly format
router.get("/components", bomController.getBomComponents); // ?bomId=<id>

module.exports = router;
