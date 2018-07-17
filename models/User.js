const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  twitterId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("users", UserSchema);
