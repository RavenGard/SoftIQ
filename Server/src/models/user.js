const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  interviewLevel: {
    type: String,
    required: true,
  },
  workingOn: {
    type: String,
    required: true,
  },
  customerFacing: {
    type: Boolean,
    required: true,
  },
  practiceCounter: {
    type: Number,
    required: false,
  },
  streakCounter: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
