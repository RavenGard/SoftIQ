const Feedback = require('../models/feedback');
const User = require('../models/user');
const Question = require('../models/question');
const { ObjectId } = require('mongodb');
const { transformFeedback } = require('./merge');

module.exports = {
  // getFeedback: async () => {
  //       try {
  //           const feedback = await Feedback.find();
  //           return feedback.map(feedback => {
  //             return transformFeedback(feedback);
  //           });
  //         } catch (err) {
  //           throw err;
  //         }
  //   },
    getFeedback: async args => {
      // Front end receives feedback information that is related to that question and that user. 
      try {
          const qId = new ObjectId(args.questionId);
          const uId = new ObjectId(args.userId);

          const fetchQuestion = await Question.findOne({ _id: qId});
          const fetchUser = await User.findOne({ _id: uId});

          
          // if the user and question are found in the feedback collection return feedback
          console.log("This is the user: " + fetchUser);
          console.log("This is the question:" + fetchQuestion)
          console.log("this is what is passed in the interface: " + args.questionId + " " + args.userId);
          if (fetchUser && fetchQuestion) {
          return feedback.map(feedback => {
            return transformFeedback(feedback);
          });
        }
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