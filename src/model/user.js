const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    _id: String,
    username: String,
    xp: String,
    level: Number,
    rank: String,
    money: Number,
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
