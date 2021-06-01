const {
  UserPersistenceAdapter,
} = require("../../../../src/db/mongo/user_adapter");
const {
  RankPersistenceAdapter,
} = require("../../../../src/db/mongo/rank_adapter");
const {
  MongoPersistenceAdapter,
  MongoPersistenceAdapterErrors,
} = require("../../../../src/db/mongo/db");
const { User } = require("../../../../src/model/user");
const { Rank } = require("../../../../src/model/rank");

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

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

let test_user_1 = {
  _id: "1234567891011",
  username: "FormulaLight",
  money: 0,
  rank: peasant_rank,
  xp: 342,
  level: 5,
};

let test_user_2 = {
  _id: "945678123452",
  username: "JohnDoe",
  money: 0,
  rank: merchant_rank,
  xp: 3420,
  level: 50,
};

async function clearCollection() {
  let user_model = new User();
  let mydb = new MongoPersistenceAdapter(user_model);
  await mydb.connect();
  await mydb.db.dropCollection("ranks");
  await mydb.db.dropCollection("users");
  await mydb.close();
}

beforeAll(async () => {
  return await clearCollection();
});

describe("Add User to MongoDB", function () {
  test("Insert sample user", async function () {
    let rank_adapter = new RankPersistenceAdapter();
    await rank_adapter.save(peasant_rank);
    let user_adapter = new UserPersistenceAdapter();
    await expect(user_adapter.save(test_user_1)).resolves.not.toThrow();
  });
});

describe("Retrieve User in MongoDB", function () {
  test("Should Retrieve User Given ID From MongoDB", async function () {
    let user_adapter = new UserPersistenceAdapter();
    let user = await user_adapter.findUserById("1234567891011");
    expect(user.username).toEqual("FormulaLight");
  });
});

describe("Retrieve Non Existent User", function () {
  it("Should Not Retrieve and Throw Erorr", async function () {
    let user_adapter = new UserPersistenceAdapter();
    await expect(user_adapter.findUserById("007")).rejects.toThrow();
  });
});

describe("Update User Values in MongooDB", function () {
  test("Should Update User Experience to new Value", async function () {
    let user_adapter = new UserPersistenceAdapter();
    let updated_user = await user_adapter.addXPtoUser("1234567891011", 1000);
    expect(updated_user.xp).toEqual(1342);
  });
});

describe("Check User Rank in MongooDB", function () {
  test("Should Return User Rank", async function () {
    let user_adapter = new UserPersistenceAdapter();
    let user = await user_adapter.findUserRankById("1234567891011");
    expect(user.rank.name).toEqual("Peasant");
  });
});

describe("Add Second User to MongoDB", function () {
  test("Insert second sample user", async function () {
    let user_adapter = new UserPersistenceAdapter();
    let rank_adapter = new RankPersistenceAdapter();
    await rank_adapter.save(merchant_rank);
    await expect(user_adapter.save(test_user_2)).resolves.not.toThrow();
  });
});
