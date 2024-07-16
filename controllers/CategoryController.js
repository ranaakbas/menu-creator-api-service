const Category = require("../models/CategoryModel");
const MenuItemCategory = require("../models/MenuItemCategoryModel");

const listCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch (error) {
    return res.status(400).json({errors: [error.message]});
  }
};

const addCategory = async (req, res) => {
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
};

const listCategoryItems = async (req, res) => {
  try {
    const {id} = req.params;

    const menuItemCategories = await MenuItemCategory.find({category: id}).populate("menuItem");
    const data = menuItemCategories.map(e => e.menuItem);

    return res.json(data);
  } catch (error) {
    return res.status(400).json({errors: [error.message]});
  }
};

const updateCategory = async (req, res) => {
  try {
    const {id} = req.params;
    const {name} = req.body;

    if (!name) {
      return res.status(400).json({errors: ["name is required"]});
    }
    const isDifferentCategoryHasSameName = await Category.exists({name: name, _id: {$ne: id}});
    if (isDifferentCategoryHasSameName) {
      return res.status(400).json({errors: "already exists"});
    }
    const category = await Category.exists({_id: id});
    if (!category) {
      return res.status(404).json({message: "category not found"});
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, {name: name}, {new: true});
    return res.json(updatedCategory);
  } catch (error) {
    return res.status(400).json({errors: [error.message]});
  }
};

const deleteCategory = async (req, res) => {
  try {
    const {id} = req.params;

    const category = await Category.exists({_id: id});
    if (!category) {
      return res.status(400).json({errors: "category not found"});
    }

    await Category.findByIdAndDelete(id);
    return res.json({message: "category deleted successfully"});
  } catch (error) {
    return res.status(400).json({errors: [error.message]});
  }
};

module.exports = {
  listCategories,
  addCategory,
  listCategoryItems,
  updateCategory,
  deleteCategory
};
