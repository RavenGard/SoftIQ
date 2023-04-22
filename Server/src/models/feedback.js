const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const feedbackSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
    score: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    week: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: false
    },
    questionRating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
