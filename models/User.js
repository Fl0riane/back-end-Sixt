const mongoose = require("mongoose");

const User = mongoose.model("User", {
  password: { type: String, required: true },
  token: { type: String },
});
module.exports = User;
