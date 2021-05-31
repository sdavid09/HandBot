const {
  UserManager,
  UserRankError,
} = require("../../../../src/user/base/user_manager");
const {
  UserPersistenceAdapter,
} = require("../../../../src/db/mongo/user_adapter");
const {
  RankPersistenceAdapter,
} = require("../../../../src/db/mongo/rank_adapter");
const { MongoPersistenceAdapter } = require("../../../../src/db/mongo/db");
const { Rank } = require("../../../../src/model/rank");
const { User } = require("../../../../src/model/user");

let peasant_rank = new Rank({
  _id: 1,
  name: "Peasant",
  icon: "https://www.peasant.com",
  ranking: 10,
  bonus: { xp: 0, money: 25 },
});

let merchant_rank = new Rank({
  _id: 2,
  name: "Merchant",
  icon: "https://www.merchant.com",
  ranking: 9,
  bonus: { xp: 5000, money: 50 },
});

let king_rank = new Rank({
  _id: 3,
  name: "King",
  icon: "https://www.king.com",
  ranking: 1,
  bonus: { xp: 5000, money: 50 },
});

let test_user_1 = {
  _id: "1234567891011",
  username: "FormulaLight",
  money: 0,
  rank: peasant_rank,
  xp: 342,
  level: 5,
};

let test_user_2 = {
  _id: "9876543210",
  username: "JamesBond",
  money: 0,
  rank: king_rank,
  xp: 342,
  level: 5,
};

beforeAll(async () => {
  await clearCollection();
  let user_adapter = new UserPersistenceAdapter();
  let rank_adapter = new RankPersistenceAdapter();
  await rank_adapter.save(king_rank);
  await rank_adapter.save(merchant_rank);
  await rank_adapter.save(peasant_rank);
  await user_adapter.save(test_user_1);
  await user_adapter.save(test_user_2);
});

async function clearCollection() {
  let user_model = new User();
  let mydb = new MongoPersistenceAdapter(user_model);
  await mydb.connect();
  await mydb.db.dropCollection("ranks");
  await mydb.db.dropCollection("users");
  await mydb.close();
}

describe("Promote User Check for Error", function () {
  test(" Try Update User Rank Should Throw Error since Ranking is Max", async function () {
    let user_manager = new UserManager();
    await expect(user_manager.promoteUserRank("9876543210")).rejects.toThrow(
      UserRankError
    );
  });
});

describe("Promote User ", function () {
  test("Promote User Successfully", async function () {
    let user_manager = new UserManager();
    let code = await user_manager.promoteUserRank("1234567891011");
    expect(code).toEqual(0);
  });
});
