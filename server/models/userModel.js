const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  username: { type: String, required: true },
  passwordHash: { type: String, required: true },
  type: { type: String, required: true },
  //For parents options=kids , coaches options=confirmedsessions
  options: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "options",
    },
  ],
});

const User = mongoose.model("user", userSchema);

module.exports = User;
