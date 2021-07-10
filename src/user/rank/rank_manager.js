let RANKS = require("../../../conf/ranks.json");

class RankManager {
  constructor() {
    this.ranks = Object.keys(RANKS).reverse(); // config must rank lowest on bottom
  }

  getRanksFromFile() {
    return this.ranks;
  }
}

module.exports = {
  RankManager,
};
