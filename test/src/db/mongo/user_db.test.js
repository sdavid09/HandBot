const { UserPersistenceAdapter } = require("../../../../src/db/mongo/user_db");

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
      await user_adapter.db.dropDatabase();
      let code = await user_adapter.save(test_user);
      expect(code).not.toEqual(-1);
    });
  });
  describe("Retrieve User", function () {
    it("Should Retrieve User from ID", async function () {
      let user_adapter = new UserPersistenceAdapter();
      let test_user_id = {
        _id: "1234567891011",
      };
      let user = user_adapter.findUserById("1234567891011");
      user.then((value) => {
        console.log(value);
        // expect(value).not.toBeUndefined();
        xpect(value).toEqual(1);
      });
    });
  });
  xdescribe("Retrieve Non Existen User", function () {
    it("Should Not Retrieve any User from ID", async function () {
      let user_adapter = new UserPersistenceAdapter();
      let user = await user_adapter.findUserById("007");
      expect(user).toBeUndefined();
    });
  });
});
