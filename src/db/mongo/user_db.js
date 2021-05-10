"use strict";
const { MongoPersistenceAdapter } = require("./db");
const { User } = require("../../model/user");

class UserPersistenceAdapter extends MongoPersistenceAdapter {
  constructor() {
    super(User);
  }

  async findUserById(id) {
    return await this.findOne({ _id: id });
  }

  async addXPtoUser(id, value) {
    return await this.update(id, { $inc: { xp: value } });
  }
}
module.exports = {
  UserPersistenceAdapter,
};
