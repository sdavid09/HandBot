const mongoose = require("mongoose");
const { User } = require("../../model/user");

let user = new User({
  _id: "1234567891011",
  username: "FormulaLight",
  money: 0,
  xp: 342,
  rank: "Peasant",
  level: 5,
});

class MDB {
  constructor() {
    this.url = "mongodb://localhost:27017/handbot";
  }

  async run() {
    mongoose.connect(this.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    db.once("open", () => {
      console.log("MongoDB Connected");
    });
    try {
      await user.save();
    } catch (e) {
      console.log(e);
    } finally {
      db.close();
    }
  }

  get() {
    const mongo = new Mongo(this.url);
    mongo.connect((err, db) => {
      if (err) {
        return console.log(err);
      }
      const database = mongo.db("handbot");
      database
        .collection("users")
        .find()
        .forEach((val) => {
          console.dir(val);
        });
      db.close();
    });
  }
}

module.exports = {
  MDB,
};

var l = new MDB();
l.run();
