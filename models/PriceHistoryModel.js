const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PriceHistorySchema = new Schema(
  {
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  {timestamps: true}
);

const PriceHistory = mongoose.model("PriceHistory", PriceHistorySchema);
module.exports = PriceHistory;
