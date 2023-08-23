const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  passwordHash: { type: String, required: true },
});

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
