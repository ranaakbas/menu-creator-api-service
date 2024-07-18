const express = require("express");
const router = express.Router();
const controller = require("../controllers/CategoryController");

router.get("/", controller.listCategories);
router.post("/", controller.checkRequiredFields, controller.checkCategoryAlreadyExists, controller.createCategory);
router.get("/:id/items", controller.listCategoryItems);
router.put(
  "/:id",
  controller.checkRequiredFields,
  controller.checkNameIsUnique,
  controller.checkCategoryIsExist,
  controller.updateCategory
);
router.delete("/:id", controller.checkNotExistCategory, controller.deleteCategory);

module.exports = router;
