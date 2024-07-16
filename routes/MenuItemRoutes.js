const express = require("express");
const router = express.Router();
const controller = require("../controllers/MenuItemController");

router.get("/", controller.listMenuItems);
router.post(
  "/",
  controller.checkRequiredFields,
  controller.checkResponseRight,
  controller.checkValidID,
  controller.addMenuItem,
  controller.createMenuItem,
  controller.createPriceHistory,
  controller.addItemToCategory,
  controller.returnCreateMenuItem
);
router.get("/:id", controller.getMenuItem);
router.put(
  "/:id",
  controller.checkRequiredFields,
  controller.checkResponseRight,
  controller.isMenuItemExist,
  controller.updateMenuItem,
  controller.updatePriceHistory,
  controller.updateMenuItemCategory,
  controller.returnUpdateMenuItem
);
router.delete("/:id", controller.isMenuItemExist, controller.deleteMenuItem);
router.get("/:id/price-history", controller.isMenuItemExist, controller.getPriceHistory);

module.exports = router;
