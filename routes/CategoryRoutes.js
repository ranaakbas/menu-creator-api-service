const express = require("express");
const router = express.Router();
const controller = require("../controllers/CategoryController");

router.get("/", controller.listCategories);
router.post("/", controller.checkReqBody, controller.checkExistCategory, controller.createCategory);
router.get("/:id/items", controller.listCategoryItems);
router.put(
  "/:id",
  controller.checkReqBody,
  controller.checkUniqueName,
  controller.checkNotExistCategory,
  controller.updateCategory
);
router.delete("/:id", controller.checkNotExistCategory, controller.deleteCategory);

module.exports = router;
