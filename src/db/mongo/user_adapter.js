"use strict";
const { MongoPersistenceAdapter } = require("./db");
const { User } = require("../../model/user");

class UserPersistenceAdapter extends MongoPersistenceAdapter {
  constructor() {
    super(User);
  }

  async findUserById(id) {
    let value = await this.findOne({ _id: id });
    if (value) {
      return value;
    } else {
      throw new UserFindByIDError(`Can't Find User Id : ${id}`);
    }
  }

  async addXPtoUser(id, value) {
    return await this.update(id, { $inc: { xp: value } });
  }

  async findUserRankById(id) {
    let value = await this.findOneAndPopulate(
      { _id: id },
      "rank",
      "name icon ranking"
    );
    if (value) {
      return value;
    } else {
      throw new UserFindRankByIDError();
    }
  }
}

class UserFindByIDError extends Error {}
class UserFindRankByIDError extends Error {}

module.exports = {
  UserPersistenceAdapter,
};
