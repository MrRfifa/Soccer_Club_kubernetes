const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  identifier: { type: String, required: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  isAnonymous: { type: Boolean, required: true },
});

const Admin = mongoose.model("contact", contactSchema);

module.exports = Admin;
