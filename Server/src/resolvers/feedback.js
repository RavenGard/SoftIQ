const Feedback = require('../models/feedback');
const User = require('../models/user');
const Question = require('../models/question');

const { transformFeedback } = require('./merge');

module.exports = {
  getFeedback: async () => {
        try {
            const feedback = await Feedback.find();
            return feedback.map(feedback => {
              return transformFeedback(feedback);
            });
          } catch (err) {
            throw err;
          }
    },
    createFeedback: async args => {
        const fetchedUser = await User.findOne({ _id: args.userId });
        const fetchedQuestion = await Question.findOne({ _id: args.questionId});

        const feedback = new Feedback({
            user: fetchedUser,
            question: fetchedQuestion,
            score: args.feedbackInput.score,
            category: args.feedbackInput.category,
            questionRating: args.feedbackInput.questionRating
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
    }
};