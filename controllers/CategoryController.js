const Category = require("../models/CategoryModel");
const MenuItemCategory = require("../models/MenuItemCategoryModel");

exports.listCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch (error) {
    return returnError(res, error);
  }
};

exports.checkReqBody = async (req, res, next) => {
  try {
    const {name} = req.body;
    if (!name) {
      return res.status(400).json({errors: ["Name is required"]});
    }
    next();
  } catch (error) {
    return returnError(res, error);
  }
};

exports.checkExistCategory = async (req, res, next) => {
  try {
    const {name} = req.body;
    const existingCategory = await Category.findOne({name});
    if (existingCategory) {
      return res.status(400).json({errors: ["Already exists"]});
    }
    next();
  } catch (error) {
    return returnError(res, error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const {name} = req.body;
    const newCategory = await Category.create({name});
    return res.json(newCategory);
  } catch (error) {
    return returnError(res, error);
  }
};

exports.listCategoryItems = async (req, res) => {
  try {
    const {id} = req.params;

    const menuItemCategories = await MenuItemCategory.find({category: id}).populate("menuItem");
    const data = menuItemCategories.map(e => e.menuItem);

    return res.json(data);
  } catch (error) {
    return returnError(res, error);
  }
};

exports.checkUniqueName = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {name} = req.body;
    const isDifferentCategoryHasSameName = await Category.exists({name: name, _id: {$ne: id}});
    if (isDifferentCategoryHasSameName) {
      return res.status(400).json({errors: "already exists"});
    }
    next();
  } catch (error) {
    return returnError(res, error);
  }
};

exports.checkNotExistCategory = async (req, res, next) => {
  try {
    const {id} = req.params;
    const category = await Category.exists({_id: id});
    if (!category) {
      return res.status(404).json({errors: "category not found"});
    }
    next();
  } catch (error) {
    return returnError(res, error);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const {id} = req.params;
    const {name} = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(id, {name: name}, {new: true});
    return res.json(updatedCategory);
  } catch (error) {
    return returnError(res, error);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(id);
    return res.json({message: "category deleted successfully"});
  } catch (error) {
    return returnError(res, error);
  }
};

const returnError = (res, error) => {
  return res.status(400).json({errors: [error.message]});
};
