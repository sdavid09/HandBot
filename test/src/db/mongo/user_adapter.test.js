const {
  UserPersistenceAdapter,
} = require("../../../../src/db/mongo/user_adapter");
const {
  RankPersistenceAdapter,
} = require("../../../../src/db/mongo/rank_adapter");
const { MongoPersistenceAdapter } = require("../../../../src/db/mongo/db");
const { User } = require("../../../../src/model/user");
const { Rank } = require("../../../../src/model/rank");

let test_rank = new Rank({
  _id: 1,
  name: "Peasant",
  icon: "https://www.peasant.com",
  ranking: 10,
  bonus: { xp: 0, money: 25 },
});

let test_user = {
  _id: "1234567891011",
  username: "FormulaLight",
  money: 0,
  rank: test_rank._id,
  xp: 342,
  level: 5,
};

async function clearCollection() {
  let user_model = new User();
  let mydb = new MongoPersistenceAdapter(user_model);
  await mydb.connect();
  await mydb.db.dropCollection("users");
  await mydb.close();
}

beforeAll(async () => {
  return await clearCollection();
});

describe("Add User to MongoDB", function () {
  test("Insert sample user", async function () {
    let rank_adapter = new RankPersistenceAdapter();
    await rank_adapter.save(test_rank);
    let user_adapter = new UserPersistenceAdapter();
    let code = await user_adapter.save(test_user);
    expect(code).not.toEqual(-1);
  });
});

describe("Retrieve User in MongoDB", function () {
  test("Should Retrieve User Given ID From MongoDB", async function () {
    let user_adapter = new UserPersistenceAdapter();
    let user = await user_adapter.findUserById("1234567891011");
    expect(user.username).toEqual("FormulaLight");
  });
});

describe("Retrieve Non Existen User", function () {
  it("Should Not Retrieve any User from ID", async function () {
    let user_adapter = new UserPersistenceAdapter();
    let user = await user_adapter.findUserById("007");
    expect(user).toEqual(null);
  });
});

describe("Update User Values in MongooDB", function () {
  test("Should Update User Experience to new Value", async function () {
    let user_adapter = new UserPersistenceAdapter();
    let updated_user = await user_adapter.addXPtoUser("1234567891011", 1000);
    expect(updated_user.xp).toEqual(1342);
  });
});

xdescribe("Check User Rank in MongooDB", function () {
  test("Should Return User Rank", async function () {
    let user_adapter = new UserPersistenceAdapter();
    let user = await user_adapter.findUserRankById("1234567891011");
    console.log(user);
    expect(user.rank).toEqual("Peasant");
  });
});
