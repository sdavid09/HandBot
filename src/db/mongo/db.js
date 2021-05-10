"use strict";
const mongoose = require("mongoose");

class MongoPersistenceAdapter {
  constructor(mongooseModel) {
    this.url = "mongodb://localhost:27017/handbot";
    this.mongooseModel = mongooseModel;
  }

  async connect() {
    await mongoose.connect(this.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.db = mongoose.connection;
  }

  async save(values) {
    let returncode = 0;
    try {
      await this.connect();
      let model = this.mongooseModel(values);
      await model.save();
    } catch (e) {
      console.log(e);
      returncode = -1;
    } finally {
      this.db.close();
      return returncode;
    }
  }

  async findOne(value) {
    await this.connect();
    const model = await this.mongooseModel.findOne(value).exec();
    this.db.close();
    return model;
  }

  async update(filter, updateValue) {
    let user;
    try {
      await this.connect();
      user = await this.mongooseModel.findOneAndUpdate(filter, updateValue, {
        new: true,
        upsert: true,
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.db.close();
    }
    return user;
  }

  async close() {
    await this.db.close();
  }
}
module.exports = {
  MongoPersistenceAdapter,
};
