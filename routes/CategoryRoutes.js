const express = require("express");
const router = express.Router();
const Category = require("../models/CategoryModel");

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch (error) {
    return res.status(400).json({errors: ["categories could not be listed"]});
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
    return res.status(400).json({errors: ["could not create new categories"]});
  }
});

module.exports = router;
