const {
  RankPersistenceAdapter,
} = require("../../../../src/db/mongo/Rank_adapter");
const { MongoPersistenceAdapter } = require("../../../../src/db/mongo/db");
const { Rank } = require("../../../../src/model/Rank");

let peasant_rank = {
  _id: 1,
  name: "Peasant",
  icon: "https://www.peasant.com",
  ranking: 10,
  bonus: { xp: 0, money: 25 },
};

let merchant_rank = {
  _id: 2,
  name: "Merchant",
  icon: "https://www.merchant.com",
  ranking: 9,
  bonus: { xp: 5000, money: 50 },
};

async function clearCollection() {
  let rank_model = new Rank();
  let mydb = new MongoPersistenceAdapter(rank_model);
  await mydb.connect();
  await mydb.db.dropCollection("ranks");
  await mydb.close();
}

beforeAll(async () => {
  return await clearCollection();
});

describe("Add Rank to MongoDB", function () {
  test("Insert Ranks", async function () {
    let rank_adapter = new RankPersistenceAdapter();
    let peasantcode = await rank_adapter.save(peasant_rank);
    let merchantcode = await rank_adapter.save(merchant_rank);
    expect(peasantcode).not.toEqual(-1);
    expect(merchantcode).not.toEqual(-1);
  });
});

describe("Retrieve Rank in MongoDB", function () {
  test("Should Retrieve Rank Given Name From MongoDB", async function () {
    let rank_adapter = new RankPersistenceAdapter();
    let rank = await rank_adapter.findRankByName("Peasant");
    expect(rank.bonus.money).toEqual(25);
  });
});

describe("Retrieve Rank By Ranking ID MongoDB", function () {
  test("Should Retrieve Rank by Ranking ID", async function () {
    let rank_adapter = new RankPersistenceAdapter();
    let rank = await rank_adapter.findRankByRankingID(9);
    expect(rank.name).toEqual("Merchant");
  });
});
