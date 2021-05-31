"use strict";
const { RankPersistenceAdapter } = require("../../db/mongo/rank_adapter");
const { UserPersistenceAdapter } = require("../../db/mongo/user_adapter");

class UserController {
  async promoteUserRank(user) {
    // check if hit max ranking, assumes rank 1 is highest
    if (user.rank.ranking <= 1) {
      console.log(` Can't Promote ${user.name} Hit max Rank!`);
    } else {
      let rank_adapter = new RankPersistenceAdapter();
      user.rank = await rank_adapter.findRankByRankingID(user.rank.ranking - 1);
      // let user_adapter = new UserPersistenceAdapter();
      // let code = await user_adapter.save(user);
    }
    return user;
  }
}

module.exports = {
  UserController,
};
