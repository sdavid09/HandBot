const mongoose = require("mongoose");
const { Schema } = mongoose;

const rankSchema = new Schema(
  {
    _id: Number,
    name: String,
    icon: String,
    ranking: Number,
    bonus: { xp: Number, money: Number },
  },
  {
    timestamps: true,
  },
  {
    collection: "ranks",
  }
);

const Rank = mongoose.model("Rank", rankSchema);

module.exports = {
  Rank,
};
