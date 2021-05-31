"use strict";
const { MongoPersistenceAdapter } = require("./db");
const { Rank } = require("../../model/rank");

class RankPersistenceAdapter extends MongoPersistenceAdapter {
  constructor() {
    super(Rank);
  }

  async findRankByName(rank_name) {
    return await this.findOne({ name: rank_name });
  }

  async findRankByRankingID(rank_id) {
    return await this.findOne({ ranking: rank_id });
  }
}
module.exports = {
  RankPersistenceAdapter,
};
