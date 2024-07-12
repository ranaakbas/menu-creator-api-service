const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItemModel");
const Category = require("../models/CategoryModel");
const MenuItemCategory = require("../models/MenuItemCategoryModel");
const PriceHistory = require("../models/PriceHistoryModel");

router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find({isDeleted: false});
    return res.json(menuItems);
  } catch (error) {
    return res.status(400).json({errors: ["menu items could not be listed"]});
  }
});

router.post("/", async (req, res) => {
  const {name, description, imageUrl, price, categories} = req.body;

  const errors = [];
  if (!name) errors.push("name is required");
  if (!imageUrl) errors.push("imageUrl is required");
  if (!price) errors.push("price is required");
  if (!categories) errors.push("categories is required");
  if (errors.length > 0) {
    return res.status(400).json({errors});
  }

  if (typeof name !== "string" || name.length < 3 || name.length > 250) errors.push("name is invalid");
  if (description && (typeof description !== "string" || description.length < 3 || description.length > 250))
    errors.push("description is invalid");
  if (typeof imageUrl !== "string") errors.push("imageUrl is invalid");
  if (typeof price !== "number" || price < 0) errors.push("price is invalid");
  if (!Array.isArray(categories)) errors.push("categories is invalid");
  if (errors.length > 0) {
    return res.status(400).json({errors});
  }

  const categoryCount = await Category.countDocuments({_id: {$in: categories}});
  if (categoryCount !== categories.length) {
    return res.status(400).json({errors: ["some category ids are invalid"]});
  }

  try {
    const createdMenu = await MenuItem.create({name, description, imageUrl, price});
    await PriceHistory.create({menuItem: createdMenu._id, price: createdMenu.price});

    for (const category of categories) {
      await MenuItemCategory.findOneAndUpdate(
        {category, menuItem: createdMenu._id},
        {},
        {
          upsert: true, // // create if it does not exist
          setDefaultsOnInsert: true, // add default values
          runValidators: true // validate
        }
      );
    }
    return res.json(createdMenu);
  } catch (error) {
    return res.status(400).json({errors: ["could not create new menu item"]});
  }
});

router.get("/:id", async (req, res) => {
  try {
    const menuItem = await MenuItem.findOne({_id: req.params.id, isDeleted: false});
    if (!menuItem) return res.status(404).json({errors: ["menu item not found"]});
    return res.json(menuItem);
  } catch (error) {
    return res.status(400).json({errors: ["menu item could not be displayed"]});
  }
});

router.put("/:id", async (req, res) => {
  const {name, description, imageUrl, price, categories} = req.body;

  const errors = [];
  if (!name) errors.push("name is required");
  if (!imageUrl) errors.push("imageUrl is required");
  if (!price) errors.push("price is required");
  if (!categories) errors.push("categories is required");
  if (errors.length > 0) {
    return res.status(400).json({errors});
  }

  if (typeof name !== "string" || name.length < 3 || name.length > 250) errors.push("name is invalid");
  if (description && (typeof description !== "string" || description.length < 3 || description.length > 250))
    errors.push("description is invalid");
  if (typeof imageUrl !== "string") errors.push("imageUrl is invalid");
  if (typeof price !== "number" || price < 0) errors.push("price is invalid");
  if (!Array.isArray(categories)) errors.push("categories is invalid");
  if (errors.length > 0) {
    return res.status(400).json({errors});
  }

  try {
    const menuItem = await MenuItem.findById({_id: req.params.id});
    if (!menuItem || menuItem.isDeleted) {
      return res.status(404).json({errors: ["menu item not found"]});
    }

    const updatedMenu = await MenuItem.findByIdAndUpdate(
      menuItem._id,
      {name, description, imageUrl, price},
      {new: true}
    );

    if (menuItem.price !== price) {
      await PriceHistory.create({menuItem: updatedMenu._id, price: price});
    }

    for (const category of categories) {
      await MenuItemCategory.findOneAndUpdate(
        {category, menuItem: updatedMenu._id},
        {},
        {
          upsert: true,
          setDefaultsOnInsert: true,
          runValidators: true
        }
      );
    }
    return res.json(updatedMenu);
  } catch (error) {
    return res.status(400).json({errors: ["could not update menu item"]});
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const menuItem = await MenuItem.exists({_id: req.params.id, isDeleted: false});
    if (!menuItem) {
      return res.status(404).json({errors: ["menu item not found"]});
    }
    await MenuItem.findByIdAndUpdate(menuItem._id, {isDeleted: true});
    return res.json({message: "menu item deleted successfully"});
  } catch (error) {
    return res.status(400).json({errors: ["menu item could not deleted"]});
  }
});

module.exports = router;
