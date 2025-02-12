const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MenuItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    imageUrl: {
      type: String
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {timestamps: true}
);

const MenuItem = mongoose.model("MenuItem", MenuItemSchema);
module.exports = MenuItem;
