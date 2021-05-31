const { UserController } = require("../../../../src/user/base/user_controller");

let user = {
  _id: "1234567891011",
  username: "FormulaLight",
  money: 0,
  rank: {
    _id: 1,
    name: "Peasant",
    icon: "https://www.peasant.com",
    ranking: 10,
    bonus: { xp: 0, money: 25 },
  },
  xp: 342,
  level: 5,
};

let rank_2 = {
  _id: 2,
  name: "Merchant",
  icon: "https://www.merchant.com",
  ranking: 9,
  bonus: { xp: 5000, money: 50 },
};

describe("Promote User", function () {
  test("Update User Rank for Promotion", async function () {
    expect(user.rank.name).toEqual("Peasant");
    let user_controller = new UserController();
    let new_user = await user_controller.promoteUserRank(user);
    expect(new_user.rank.name).toEqual("Merchant");
  });
});
