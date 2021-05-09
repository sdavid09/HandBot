"use strict";
const { MongoPersistenceAdapter } = require("./db");
const { User } = require("../../model/user");

class UserPersistenceAdapter extends MongoPersistenceAdapter {
  constructor() {
    super(User);
    this.url = "mongodb://localhost:27017/handbot";
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
    let user;
    try {
      await this.connect();
      user = await User.findOneAndUpdate(id, value, {
        new: true,
        upsert: true,
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.db.close();
    }
    return user;
  }
}
module.exports = {
  UserPersistenceAdapter,
};
