const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MenuItemCategorySchema = new Schema(
  {
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    }
  },
  {timestamps: true}
);

const MenuItemCategory = mongoose.model("MenuItemCategory", MenuItemCategorySchema);
module.exports = MenuItemCategory;
