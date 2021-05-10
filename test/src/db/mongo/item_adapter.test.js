const {
  ItemPersistenceAdapter,
} = require("../../../../src/db/mongo/item_adapter");
const { MongoPersistenceAdapter } = require("../../../../src/db/mongo/db");
const { Item } = require("../../../../src/model/item");

let test_item = {
  name: "Axe",
  description: "A battle weapon for close quarters",
  value: 500,
  rarity: 1,
};

async function clearCollection() {
  let item_model = new Item();
  let mydb = new MongoPersistenceAdapter(item_model);
  await mydb.connect();
  await mydb.db.dropCollection("items");
  await mydb.close();
}

beforeAll(async () => {
  return await clearCollection();
});

describe("Add Item to MongoDB", function () {
  test("Insert sample item", async function () {
    let item_adapter = new ItemPersistenceAdapter();
    let code = await item_adapter.save(test_item);
    expect(code).not.toEqual(-1);
  });
});

describe("Retrieve Item in MongoDB", function () {
  test("Should Retrieve Item Given Name From MongoDB", async function () {
    let item_adapter = new ItemPersistenceAdapter();
    let item = await item_adapter.findItemByName("Axe");
    expect(item.value).toEqual(500);
  });
});
