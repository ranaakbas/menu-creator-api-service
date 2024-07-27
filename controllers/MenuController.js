const Category = require("../models/CategoryModel");
const MenuItemCategory = require("../models/MenuItemCategoryModel");

exports.finalMenu = async (req, res) => {
  try {
    const {id} = req.params;
    const categories = await Category.find({user: id});
    const categoryIds = categories.map(category => category._id);

    const menuItemCategories = await MenuItemCategory.find({category: {$in: categoryIds}}).populate({
      path: "menuItem",
      match: {isDeleted: false},
      options: {sort: {name: 1}}
    });

    const menu = categories.map(category => ({
      name: category.name,
      menuItems: menuItemCategories
        .filter(
          menuItemCategory =>
            menuItemCategory.menuItem &&
            String(menuItemCategory.category) === String(category._id) &&
            !menuItemCategory.menuItem.isDeleted
        )
        .map(menuItemCategory => menuItemCategory.menuItem)
    }));

    return res.json(menu);
  } catch (error) {
    return res.sendError(error);
  }
};
