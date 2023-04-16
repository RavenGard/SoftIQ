const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tipSchema = new Schema({
  tipId: {
    type: Number,
    required: true,
  },
  tipType: {
    type: String,
    required: true,
  },
  tipTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Tip", tipSchema);