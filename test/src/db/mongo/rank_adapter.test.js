const {
  RankPersistenceAdapter,
} = require("../../../../src/db/mongo/Rank_adapter");
const { MongoPersistenceAdapter } = require("../../../../src/db/mongo/db");
const { Rank } = require("../../../../src/model/Rank");

let test_rank = {
  name: "Peasant",
  icon: "https://www.peasant.com",
  ranking: 10,
  bonus: { xp: 0, money: 25 },
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
  test("Insert sample Rank", async function () {
    let rank_adapter = new RankPersistenceAdapter();
    let code = await rank_adapter.save(test_rank);
    expect(code).not.toEqual(-1);
  });
});

describe("Retrieve Rank in MongoDB", function () {
  test("Should Retrieve Rank Given Name From MongoDB", async function () {
    let rank_adapter = new RankPersistenceAdapter();
    let rank = await rank_adapter.findRankByName("Peasant");
    expect(rank.bonus.money).toEqual(25);
  });
});
