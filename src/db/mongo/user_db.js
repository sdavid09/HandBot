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

  async findUserById(id) {
    const user = await User.findOne({ _id: id }).exec();
    this.db.close();
    return user;
  }

  async update(id, value) {
    const user = await User.findOneAndUpdate(
      id,
      value,
      { upsert: true, returnOriginal: false },
      (err, doc) => {
        if (err) {
          console.log("Update Error!");
        }
      }
    );
    this.db.close();
    return user;
  }
}
module.exports = {
  UserPersistenceAdapter,
};
