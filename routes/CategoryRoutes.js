const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryController");

router.get("/", categoryController.listCategories);
router.post("/", categoryController.addCategory);
router.get("/:id/items", categoryController.listCategoryItems);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
