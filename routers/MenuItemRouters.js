const express = require("express");
const router = express.Router();
const controller = require("../controllers/MenuItemController");
const {permit, USER_TYPES} = require("../helpers");

router.get("/", permit(USER_TYPES.USER), controller.listMenuItems);
router.post(
  "/",
  permit(USER_TYPES.USER),
  controller.checkRequiredFields,
  controller.checkFieldsAreValid,
  controller.checkCategoryIdsValid,
  controller.createMenuItem,
  controller.createPriceHistory,
  controller.addItemToCategory
);
router.get("/:id", permit(USER_TYPES.USER), controller.getMenuItem);
router.put(
  "/:id",
  permit(USER_TYPES.USER),
  controller.checkRequiredFields,
  controller.checkFieldsAreValid,
  controller.isMenuItemExist,
  controller.updateMenuItem,
  controller.updatePriceHistory,
  controller.updateMenuItemCategory
);
router.delete("/:id", permit(USER_TYPES.USER), controller.isMenuItemExist, controller.deleteMenuItem);
router.get("/:id/price-history", permit(USER_TYPES.USER), controller.isMenuItemExist, controller.getPriceHistory);

module.exports = router;
