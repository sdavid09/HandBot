const Mongo = require("mongodb").MongoClient;
const mongoose = require("mongoose");

let user = {
  id: 1,
  name: "FormulaLight",
  money: 0,
  xp: 342,
  rank: "Peasant",
  level: 5,
};

class MDB {
  constructor() {
    this.url = "mongodb://localhost:27017/handbot";
  }

  run() {
    const mongo = new Mongo(this.url);
    mongo.connect((err, db) => {
      if (err) {
        return console.log(err);
      }
      const database = mongo.db("handbot");
      database.collection("users").insertOne(user, (err, res) => {
        if (err) {
          return console.log(err);
        }
        console.log("Inserted user");
      });
      db.close();
    });
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
l.get();
