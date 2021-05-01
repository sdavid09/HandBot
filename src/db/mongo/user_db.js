"use strict";
const mongoose = require("mongoose");
const { User } = require("../../model/user");

class UserPersistenceAdapter {
  constructor() {
    this.url = "mongodb://localhost:27017/handbot";
  }

  async connect() {
    await mongoose.connect(this.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.db = mongoose.connection;
  }

  async save(values) {
    try {
      await this.connect();
      let user = User(values);
      await user.save();
    } catch (e) {
      console.log(e);
      return -1;
    } finally {
      this.db.close();
    }
  }

  async findUserById(id) {
    await this.connect();
    const user = await User.findOne({ _id: id }).exec();
    this.db.close();
    return user;
  }

  async update(id, value) {
    await this.connect();
    const user = await User.findOneAndUpdate(
      id,
      value,
      { upsert: true, returnOriginal: false },
      (err, doc) => {
        if (err) {
          console.log("Update Error!");
        }
      }
    );
    this.db.close();
    return user;
  }
}
module.exports = {
  UserPersistenceAdapter,
};

// let user_adapter = new UserPersistenceAdapter();
// let test_user_id = {
//   _id: "1234567891011",
// };
// let user = user_adapter.findUserById("1234567891011");
// user.then(console.log);
