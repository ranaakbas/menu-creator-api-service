const Category = require("../models/CategoryModel");
const MenuItemCategory = require("../models/MenuItemCategoryModel");

exports.listCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch (error) {
    return res.sendError(error);
  }
};

exports.checkRequiredFields = async (req, res, next) => {
  try {
    const {name} = req.body;
    if (!name) {
      return res.sendError("Name is required");
    }
    next();
  } catch (error) {
    return res.sendError(error);
  }
};

exports.checkCategoryAlreadyExists = async (req, res, next) => {
  try {
    const {name} = req.body;
    const existingCategory = await Category.exists({name});
    if (existingCategory) {
      return res.sendError("Already exists");
    }
    next();
  } catch (error) {
    return res.sendError(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const {name} = req.body;
    const newCategory = await Category.create({name});
    return res.json(newCategory);
  } catch (error) {
    return res.sendError(error);
  }
};

exports.listCategoryItems = async (req, res) => {
  try {
    const {id} = req.params;

    const menuItemCategories = await MenuItemCategory.find({category: id}).populate("menuItem");
    const data = menuItemCategories.map(e => e.menuItem);
    return res.json(data);
  } catch (error) {
    return res.sendError(error);
  }
};

exports.checkNameIsUnique = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {name} = req.body;
    const isDifferentCategoryHasSameName = await Category.exists({name: name, _id: {$ne: id}});
    if (isDifferentCategoryHasSameName) {
      return res.sendError("Already exists");
    }
    next();
  } catch (error) {
    return res.sendError(error);
  }
};

exports.checkCategoryIsExist = async (req, res, next) => {
  try {
    const {id} = req.params;
    const category = await Category.exists({_id: id});
    if (!category) {
      return res.sendError("category not found");
    }
    next();
  } catch (error) {
    return res.sendError(error);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const {id} = req.params;
    const {name} = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(id, {name: name}, {new: true});
    return res.json(updatedCategory);
  } catch (error) {
    return res.sendError(error);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const {id} = req.params;
    await Category.findByIdAndDelete(id);
    return res.json({message: "category deleted successfully"});
  } catch (error) {
    return res.sendError(error);
  }
};