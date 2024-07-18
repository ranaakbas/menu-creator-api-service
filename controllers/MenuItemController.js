const MenuItem = require("../models/MenuItemModel");
const Category = require("../models/CategoryModel");
const MenuItemCategory = require("../models/MenuItemCategoryModel");
const PriceHistory = require("../models/PriceHistoryModel");
const helpers = require("../helpers");

exports.listMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({isDeleted: false});
    return res.json(menuItems);
  } catch (error) {
    return helpers.returnError(res, error);
  }
};

exports.checkRequiredFields = (req, res, next) => {
  const {name, imageUrl, price, categories} = req.body;

  const errors = [];
  if (!name) errors.push("name is required");
  if (!imageUrl) errors.push("imageUrl is required");
  if (!price) errors.push("price is required");
  if (!categories) errors.push("categories is required");
  if (errors.length > 0) {
    return helpers.returnError(res, errors);
  }
  next();
};

exports.checkFieldsAreValid = (req, res, next) => {
  const {name, description, imageUrl, price, categories} = req.body;

  const errors = [];
  if (typeof name !== "string" || name.length < 3 || name.length > 250) errors.push("name is invalid");
  if (description && (typeof description !== "string" || description.length < 3 || description.length > 250))
    errors.push("description is invalid");
  if (typeof imageUrl !== "string") errors.push("imageUrl is invalid");
  if (typeof price !== "number" || price < 0) errors.push("price is invalid");
  if (!Array.isArray(categories)) errors.push("categories is invalid");
  if (errors.length > 0) {
    return helpers.returnError(res, errors);
  }

  res.locals = {name, description, imageUrl, price, categories};
  next();
};

exports.checkCategoryIdsValid = async (req, res, next) => {
  const {categories} = res.locals;
  const categoryCount = await Category.countDocuments({_id: {$in: categories}});
  if (categoryCount !== categories.length) {
    return helpers.returnError(res, "some category ids are invalid");
  }
  next();
};

exports.createMenuItem = async (req, res, next) => {
  try {
    const {name, description, imageUrl, price} = res.locals;
    const createdMenu = await MenuItem.create({name, description, imageUrl, price});
    res.locals = {...res.locals, createdMenu};
    next();
  } catch (error) {
    return helpers.returnError(res, error);
  }
};

exports.createPriceHistory = async (req, res, next) => {
  try {
    const {createdMenu} = res.locals;
    await PriceHistory.create({menuItem: createdMenu._id, price: createdMenu.price});
    next();
  } catch (error) {
    return helpers.returnError(res, error);
  }
};

exports.addItemToCategory = async (req, res) => {
  try {
    const {categories, createdMenu} = res.locals;
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
    return helpers.returnError(res, error);
  }
};

exports.getMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findOne({_id: req.params.id, isDeleted: false});
    if (!menuItem) return helpers.returnError(res, "menu item not found");
    return res.json(menuItem);
  } catch (error) {
    return helpers.returnError(res, error);
  }
};

exports.isMenuItemExist = async (req, res, next) => {
  try {
    const menuItem = await MenuItem.exists({_id: req.params.id, isDeleted: false});
    if (!menuItem) return helpers.returnError(res, "menu item not found");
    res.locals = {...res.locals, menuItem};
    next();
  } catch (error) {
    return helpers.returnError(res, error);
  }
};

exports.updateMenuItem = async (req, res, next) => {
  try {
    const {name, description, imageUrl, price, menuItem} = res.locals;
    const updatedMenu = await MenuItem.findByIdAndUpdate(
      menuItem._id,
      {name, description, imageUrl, price},
      {new: true}
    );
    res.locals = {...res.locals, updatedMenu};
    next();
  } catch (error) {
    return helpers.returnError(res, error);
  }
};

exports.updatePriceHistory = async (req, res, next) => {
  try {
    const {price, menuItem, updatedMenu} = res.locals;
    if (menuItem.price !== price) {
      await PriceHistory.create({menuItem: updatedMenu._id, price: price});
    }
    next();
  } catch (error) {
    return helpers.returnError(res, error);
  }
};

exports.updateMenuItemCategory = async (req, res) => {
  try {
    const {categories, updatedMenu} = res.locals;
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
    return helpers.returnError(res, error);
  }
};

exports.deleteMenuItem = async (req, res) => {
  try {
    const {menuItem} = res.locals;
    await MenuItem.findByIdAndUpdate(menuItem._id, {isDeleted: true});
    return res.json({message: "menu item deleted successfully"});
  } catch (error) {
    return helpers.returnError(res, error);
  }
};

exports.getPriceHistory = async (req, res) => {
  try {
    const {id} = req.params;
    const priceHistory = await PriceHistory.find({menuItem: id});
    return res.json(priceHistory);
  } catch (error) {
    return helpers.returnError(res, error);
  }
};
