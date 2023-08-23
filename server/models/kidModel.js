const mongoose = require("mongoose");
const Parent = require("./userModel");

const kidSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parent",
    required: true,
  },
  parentUname: {
    type: String,
    required: true,
  },
  image: { type: String, required: true },
  info: {
    data: Buffer,
    contentType: String,
  },
});

const Kid = mongoose.model("kid", kidSchema);

module.exports = Kid;
