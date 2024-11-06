const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("User", Schema);
