"use strict";
const { MongoPersistenceAdapter } = require("./db");
const { Item } = require("../../model/item");

class ItemPersistenceAdapter extends MongoPersistenceAdapter {
  constructor() {
    super(Item);
  }

  async findItemByName(item_name) {
    return await this.findOne({ name: item_name });
  }
}
module.exports = {
  ItemPersistenceAdapter,
};
