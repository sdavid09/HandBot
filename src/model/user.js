const mongoose = require("mongoose");
const { Schema } = mongoose;
const Item = require("../model/item");
const Rank = require("../model/rank");

const userSchema = new Schema(
  {
    _id: String,
    username: String,
    xp: Number,
    level: Number,
    rank: { type: Schema.Types.ObjectId, ref: "Rank" },
    money: Number,
    items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  },
  {
    timestamps: true,
  },
  {
    collection: "users",
  }
);

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
