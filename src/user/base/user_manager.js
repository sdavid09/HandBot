"use strict";
const { RankPersistenceAdapter } = require("../../db/mongo/rank_adapter");
const { UserPersistenceAdapter } = require("../../db/mongo/user_adapter");

class UserManager {
  async promoteUserRank(user_id) {
    let user_adapter = new UserPersistenceAdapter();
    let user = await user_adapter.findUserRankById(user_id);
    let code = 0;
    // check if hit max ranking, assumes rank 1 is highest
    if (user.rank.ranking <= 1) {
      throw new UserRankError(`Can't Promote ${user.name} Already max Rank!`);
    } else {
      let rank_adapter = new RankPersistenceAdapter();
      user.rank = await rank_adapter.findRankByRankingID(user.rank.ranking - 1);
      code = await user_adapter.save(user);
    }

    return code;
  }
}

class UserRankError extends Error {}

module.exports = {
  UserManager,
  UserRankError,
};
