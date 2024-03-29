const Feedback = require("../models/feedback");
const User = require("../models/user");
const Question = require("../models/question");
const { ObjectId } = require("mongodb");
const { transformFeedback } = require("./merge");

module.exports = {
  getFeedback: async (args) => {
    // Front end receives feedback information that is related to that question and that user.
    try {
      const qId = new ObjectId(args.questionId);
      const uId = new ObjectId(args.userId);

      const fetchQuestion = await Question.findOne({ _id: qId });
      const fetchUser = await User.findOne({ _id: uId });

      // if the user and question are found in the feedback collection return feedback
      const singleFeedback = await Feedback.findOne({
        user: fetchUser,
        question: fetchQuestion,
      });

      if (!singleFeedback) {
        throw new Error("You haven't answered this question yet.");
      }

      // have to return it as an array of transform feedback since we aren't using the map function
      // schema expects an array of feedback fields
      return [transformFeedback(singleFeedback)];
    } catch (err) {
      throw err;
    }
  },

  getAllFeedback: async (args) => {
    try {
      const uId = new ObjectId(args.userId);

      const feedbacks = await Feedback.find({ user: uId });

      return feedbacks.map((feedback) => {
        return transformFeedback(feedback);
      });
    } catch (err) {
      throw err;
    }
  },

  // This does not work yet. Returns empty array.

  getAllFeedbackBasedOnCategory: async (args) => {
    try {
      const uId = new ObjectId(args.userId);

      const feedbacks = await Feedback.find({
        _id: uId,
        category: args.category,
      });

      return feedbacks.map((feedback) => {
        return transformFeedback(feedback);
      });
    } catch (err) {
      throw err;
    }
  },

  createFeedback: async (args) => {
    const fetchedUser = await User.findOne({ _id: args.userId });
    const fetchedQuestion = await Question.findOne({ _id: args.questionId });

    const month = new Date().toLocaleString("default", { month: "long" });

    let week;

    const day = new Date().toLocaleString("default", { day: "numeric" });

    if (day < 8) {
      week = "Week 1";
    } else if (day < 15) {
      week = "Week 2";
    } else if (day < 22) {
      week = "Week 3";
    } else if (day < 31) {
      week = "Week 4";
    }

    const feedback = new Feedback({
      user: fetchedUser,
      question: fetchedQuestion,
      score: args.feedbackInput.score,
      category: args.feedbackInput.category,
      month: month,
      day: day,
      week: week,
      questionRating: args.feedbackInput.questionRating,
    });
    // console.log("This is the fetched question: " + fetchedQuestion);
    let createdFeedback;

    try {
      const result = await feedback.save();
      createdFeedback = transformFeedback(result);
      return createdFeedback;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
