"use strict";
const { RankPersistenceAdapter } = require("../../db/mongo/rank_adapter");
const { UserPersistenceAdapter } = require("../../db/mongo/user_adapter");

class UserManager {
  constructor() {
    this.user_adapter = new UserPersistenceAdapter();
    this.rank_adapter = new RankPersistenceAdapter();
  }
  async promoteUserRank(user_id) {
    try {
      let user = await this.user_adapter.findUserRankById(user_id);
      if (user.rank.ranking <= 1) {
        throw new UserRankError(
          `Can't Promote ${user.username} Already max Rank!`
        );
      } else {
        user.rank = await this.rank_adapter.findRankByRankingID(
          user.rank.ranking - 1
        );
        await this.user_adapter.save(user);
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

class UserRankError extends Error {}

module.exports = {
  UserManager,
  UserRankError,
};
