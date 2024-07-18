const Category = require("../models/CategoryModel");
const MenuItemCategory = require("../models/MenuItemCategoryModel");
const helpers = require("../helpers");

exports.listCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch (error) {
    return helpers.returnError(res, error);
  }
};

exports.checkRequiredFields = async (req, res, next) => {
  try {
    const {name} = req.body;
    if (!name) {
      return helpers.returnError(res, ["Name is required"]);
    }
    next();
  } catch (error) {
    return helpers.returnError(res, error);
  }
};

exports.checkCategoryAlreadyExists = async (req, res, next) => {
  try {
    const {name} = req.body;
    const existingCategory = await Category.exists({name});
    if (existingCategory) {
      return helpers.returnError(res, ["Already exists"]);
    }
    next();
  } catch (error) {
    return helpers.returnError(res, error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const {name} = req.body;
    const newCategory = await Category.create({name});
    return res.json(newCategory);
  } catch (error) {
    return helpers.returnError(res, error);
  }
};

exports.listCategoryItems = async (req, res) => {
  try {
    const {id} = req.params;

    const menuItemCategories = await MenuItemCategory.find({category: id}).populate("menuItem");
    const data = menuItemCategories.map(e => e.menuItem);
    return res.json(data);
  } catch (error) {
    return helpers.returnError(res, error);
  }
};

exports.checkNameIsUnique = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {name} = req.body;
    const isDifferentCategoryHasSameName = await Category.exists({name: name, _id: {$ne: id}});
    if (isDifferentCategoryHasSameName) {
      return helpers.returnError(res, ["Already exists"]);
    }
    next();
  } catch (error) {
    return helpers.returnError(res, error);
  }
};

exports.checkCategoryIsExist = async (req, res, next) => {
  try {
    const {id} = req.params;
    const category = await Category.exists({_id: id});
    if (!category) {
      return helpers.returnError(res, ["category not found"]);
    }
    next();
  } catch (error) {
    return helpers.returnError(res, error);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const {id} = req.params;
    const {name} = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(id, {name: name}, {new: true});
    return res.json(updatedCategory);
  } catch (error) {
    return helpers.returnError(res, error);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const {id} = req.params;
    await Category.findByIdAndDelete(id);
    return res.json({message: "category deleted successfully"});
  } catch (error) {
    return helpers.returnError(res, error);
  }
};
