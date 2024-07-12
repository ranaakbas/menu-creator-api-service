const express = require("express");
const router = express.Router();
const Category = require("../models/CategoryModel");
const MenuItem = require("../models/MenuItemModel");

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch (error) {
    return res.status(400).json({errors: [error.message]});
  }
});

router.post("/", async (req, res) => {
  try {
    const {name} = req.body;

    if (!name) {
      return res.status(400).json({errors: ["Name is required"]});
    }
    const existingCategory = await Category.findOne({name: name});
    if (existingCategory) {
      return res.status(400).json({errors: ["Already exists"]});
    }
    const newCategory = await Category.create({name});
    return res.json(newCategory);
  } catch (error) {
    return res.status(400).json({errors: [error.message]});
  }
});

router.get("/:id/items", async (req, res) => {
  try {
    const {id} = req.params.id;

    const items = await MenuItem.find({category: id, isDeleted: false});
    return res.json(items);
  } catch (error) {
    return res.status(400).json({errors: [error.message]});
  }
});

router.put("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const {name} = req.body;

    if (!name) {
      return res.status(400).json({errors: ["name is required"]});
    }
    const existingCategory = await Category.findOne({name: name});
    if (existingCategory && existingCategory._id.toString() !== id) {
      return res.status(400).json({errors: "already exists"});
    }
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({message: "category not found"});
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, {name: name}, {new: true});
    return res.json(updatedCategory);
  } catch (error) {
    return res.status(400).json({errors: [error.message]});
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const {id} = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(400).json({errors: "category not found"});
    }

    await Category.findByIdAndDelete(id);
    return res.json({message: "category deleted successfully"});
  } catch (error) {
    return res.status(400).json({errors: [error.message]});
  }
});

module.exports = router;
