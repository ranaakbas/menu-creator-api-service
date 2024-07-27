const express = require("express");
const router = express.Router();
const controller = require("../controllers/CategoryController");
const {permit, USER_TYPES} = require("../helpers");

router.get("/", permit(USER_TYPES.PUBLIC), controller.listCategories);
router.post(
  "/",
  permit(USER_TYPES.PUBLIC),
  controller.checkRequiredFields,
  controller.checkCategoryAlreadyExists,
  controller.createCategory
);
router.get("/:id/items", permit(USER_TYPES.PUBLIC), controller.listCategoryItems);
router.put(
  "/:id",
  permit(USER_TYPES.PUBLIC),
  controller.checkRequiredFields,
  controller.checkNameIsUnique,
  controller.checkCategoryIsExist,
  controller.updateCategory
);
router.delete("/:id", permit(USER_TYPES.PUBLIC), controller.checkCategoryIsExist, controller.deleteCategory);

module.exports = router;
