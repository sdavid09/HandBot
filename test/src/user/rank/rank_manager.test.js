const { RankManager } = require("../../../../src/user/rank/rank_manager");
const { MongoPersistenceAdapter } = require("../../../../src/db/mongo/db");
const { Rank } = require("../../../../src/model/Rank");

//   async function clearCollection() {
//     let rank_model = new Rank();
//     let mydb = new MongoPersistenceAdapter(rank_model);
//     await mydb.connect();
//     await mydb.db.dropCollection("ranks");
//     await mydb.close();
//   }

// beforeAll(async () => {
//   return await clearCollection();
// });

describe("Read Ranks From config save in database", function () {
  test("Insert Ranks", async function () {
    let rank_manager = new RankManager();
    await expect(rank_manager.getRanksFromFile()).toEqual([
      "Peasant",
      "Merchant",
      "Mercenary",
      "Artisan",
      "Bard",
      "Scholar",
      "Noble",
      "Knight",
      "Lord",
      "King",
    ]);
  });
});
