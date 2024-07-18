const express = require("express");
const router = express.Router();
const controller = require("../controllers/MenuItemController");

router.get("/", controller.listMenuItems);
router.post(
  "/",
  controller.checkRequiredFields,
  controller.checkFieldsAreValid,
  controller.checkCategoryIdsValid,
  controller.createMenuItem,
  controller.createPriceHistory,
  controller.addItemToCategory
);
router.get("/:id", controller.getMenuItem);
router.put(
  "/:id",
  controller.checkRequiredFields,
  controller.checkFieldsAreValid,
  controller.isMenuItemExist,
  controller.updateMenuItem,
  controller.updatePriceHistory,
  controller.updateMenuItemCategory
);
router.delete("/:id", controller.isMenuItemExist, controller.deleteMenuItem);
router.get("/:id/price-history", controller.isMenuItemExist, controller.getPriceHistory);

module.exports = router;
