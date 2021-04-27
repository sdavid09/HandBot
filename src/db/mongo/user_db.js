const mongoose = require("mongoose");
const { User } = require("../../model/user");

class UserPersistenceAdapter {
  constructor() {
    this.url = "mongodb://localhost:27017/handbot";
    this.connect();
  }

  connect() {
    mongoose.connect(this.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.db = mongoose.connection;
    // this.db.once("open", () => {
    //   console.log("MongoDB Connected");
    // });
  }

  async save(values) {
    try {
      let user = User(values);
      await user.save();
    } catch (e) {
      console.log(e);
      return -1;
    } finally {
      this.db.close();
    }
  }

  async findById(id) {
    let query;
    try {
      query = await User.findOne({ _id: id });
    } catch (e) {
      console.log(e);
      return -1;
    } finally {
      this.db.close();
      return query;
    }
  }
  async update() {}
}
module.exports = {
  UserPersistenceAdapter,
};
