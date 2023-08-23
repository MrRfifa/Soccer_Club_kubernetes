const mongoose = require("mongoose");

const TrainingSessionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  adminUname: {
    type: String,
    required: true,
  },
  coachUname: { type: String, required: true },
  confirmed: { type: Boolean, required: true },
});

const TrainingSession = mongoose.model(
  "TrainingSession",
  TrainingSessionSchema
);

module.exports = TrainingSession;
