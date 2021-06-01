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
      useFindAndModify: false,
    });

    this.db = mongoose.connection;
  }

  async save(values) {
    try {
      await this.connect();
      let model = this.mongooseModel(values);
      await model.save();
    } catch (e) {
      throw new MongoPersistenceAdapterErrors(e);
    } finally {
      this.db.close();
    }
  }

  async findOne(value) {
    await this.connect();
    const model = await this.mongooseModel.findOne(value).exec();
    this.db.close();
    return model;
  }

  async findOneAndPopulate(value, ...populate_filter) {
    await this.connect();
    const model = await this.mongooseModel
      .findOne(value)
      .populate(populate_filter)
      .exec();
    this.db.close();
    return model;
  }

  async update(filter, updateValue) {
    let model;
    try {
      await this.connect();
      model = await this.mongooseModel.findOneAndUpdate(filter, updateValue, {
        new: true,
        upsert: true,
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.db.close();
    }
    return model;
  }

  async close() {
    await this.db.close();
  }
}

class MongoPersistenceAdapterErrors extends Error {}

module.exports = {
  MongoPersistenceAdapter,
  MongoPersistenceAdapterErrors,
};
