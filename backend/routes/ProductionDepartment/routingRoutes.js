const express = require("express");
const router = express.Router();
const routingController = require("../../controllers/ProductionDepartment/routingController");

router.post("/create", routingController.createRouting);
router.get("/list", routingController.getAllRoutings);
// router.get("/:id", routingController.getRoutingById);
router.put("/update/:id", routingController.updateRouting);
router.delete("/delete/:id", routingController.deleteRouting);

module.exports = router;
