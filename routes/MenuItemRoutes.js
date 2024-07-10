const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItemModel");
const Category = require("../models/CategoryModel");
const MenuItemCategory = require("../models/MenuItemCategoryModel");
const PriceHistory = require("../models/PriceHistoryModel");

router.get("/", (req, res) => {
  MenuItem.find({isDeleted: false})
    .then(async result => {
      const menuItems = await MenuItem.find({isDeleted: false});
      res.json(menuItems);
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/", async (req, res) => {
  const {name, description, image_url, price, categories} = req.body;

  const errors = [];
  if (!name) errors.push("name is required");
  if (!image_url) errors.push("image_url is required");
  if (!price) errors.push("price is required");
  if (!categories) errors.push("categories is required");
  if (errors.length > 0) {
    return res.status(400).json({errors});
  }

  if (typeof name !== "string" || name.length < 3 || name.length > 250) errors.push("name is invalid");
  if (description && (typeof description !== "string" || description.length < 3 || description.length > 250))
    errors.push("description is invalid");
  if (typeof image_url !== "string") errors.push("image_url is invalid");
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
    const createdMenu = await MenuItem.create({name, description, image_url, price});
    await PriceHistory.create({menuItem: createdMenu._id, price: createdMenu.price});

    for (const category of categories) {
      await MenuItemCategory.findOneAndUpdate(
        {category, menuItem: createdMenu._id},
        {},
        {
          upsert: true, // yoksa oluştur
          setDefaultsOnInsert: true, // defautl degerleri ekle
          runValidators: true // validate et
        }
      );
    }
    res.json(createdMenu);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
