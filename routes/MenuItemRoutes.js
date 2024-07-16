const express = require("express");
const router = express.Router();
const menuItemController = require("../controllers/MenuItemController");

router.get("/", menuItemController.listMenuItems);
router.post("/", menuItemController.addMenuItem);
router.get("/:id", menuItemController.getMenuItem);
router.put("/:id", menuItemController.updateMenuItem);
router.delete("/:id", menuItemController.deleteMenuItem);
router.get("/:id/price-history", menuItemController.getPriceHistory);

module.exports = router;
