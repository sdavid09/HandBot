const { UserPersistenceAdapter } = require("../../../../src/db/mongo/user_db");

let test_user = {
  _id: "1234567891011",
  username: "FormulaLight",
  money: 0,
  xp: 342,
  rank: "Peasant",
  level: 5,
};

describe("Add User to MongoDB", function () {
  test("Insert sample user", async function () {
    let user_adapter = new UserPersistenceAdapter();
    await user_adapter.connect();
    await user_adapter.db.dropDatabase();
    let code = await user_adapter.save(test_user);
    expect(code).not.toEqual(-1);
  });
});

describe("Retrieve User in MongoDB", function () {
  test("Should Retrieve User Given ID From MongoDB", async function () {
    let user_adapter = new UserPersistenceAdapter();
    let user = await user_adapter.findUserById("1234567891011");
    console.log(user);
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
    let updated_user = await user_adapter.update("1234567891011", { xp: 1020 });
    console.log(updated_user);
    expect(updated_user.xp).toEqual("1020");
  });
});
