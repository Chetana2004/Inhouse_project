const express = require("express");
const router = express.Router();
const routingController = require("../../controllers/ProductionDepartment/routingController");

router.post("/", routingController.createRouting);
router.get("/", routingController.getAllRoutings);
router.get("/:id", routingController.getRoutingById);
router.put("/:id", routingController.updateRouting);
router.delete("/:id", routingController.deleteRouting);

module.exports = router;
