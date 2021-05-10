const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema(
  {
    name: String,
    description: String,
    value: Number,
    rarity: Number,
  },
  {
    timestamps: true,
  },
  {
    collection: "items",
  }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = {
  Item,
};
