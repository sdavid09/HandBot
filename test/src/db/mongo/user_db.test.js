const { UserPersistenceAdapter } = require("../../../../src/db/mongo/user_db");
// await mongoose.connection.dropDatabase();
let test_user = {
  _id: "1234567891011",
  username: "FormulaLight",
  money: 0,
  xp: 342,
  rank: "Peasant",
  level: 5,
};

describe("Mongoose Test", function () {
  describe("Add User to MongoDB", function () {
    test("Insert sample user", async function () {
      let user_adapter = new UserPersistenceAdapter();
      let code = await user_adapter.save(test_user);
      expect(code).not.toEqual(-1);
    });
  });
  describe("Retrieve User", function () {
    it("Should Retrieve User from ID", async function () {
      let user_adapter = new UserPersistenceAdapter();
      let user = await user_adapter.findById("1234567891011");
      expect(user).not.toBeUndefined();
    });
  });
  describe("Retrieve Non Existen User", function () {
    it("Should Not Retrieve any User from ID", async function () {
      let user_adapter = new UserPersistenceAdapter();
      let user = await user_adapter.findById("007");
      expect(user).toBeUndefined();
    });
  });
});
