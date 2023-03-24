const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    starCategory: {
      type: Boolean,
      required: true,
    },
    questionDescription: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    tips: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
