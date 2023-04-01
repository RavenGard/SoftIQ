const Question = require('../models/question');
const User = require('../models/user');
// const Feedback = require('../models/feedback');

const questions = async questionIds => {
  try {
    const questions = await Question.find({ _id: { $in: questionIds } });
    return questions.map(question => {
      return transformQuestion(question);
    });
  } catch (err) {
    throw err;
  }
};

const singleQuestion = async questionId => {
  try{
    const question = await Question.findById(questionId);
    return transformQuestion(question);
  } catch (err) {
    throw err;
  }
}

// const singleFeedback = async feedbackId => {
//   try{
//     const feedback = await Feedback.findById(feedbackId);
//     return transformFeedback(feedback);
//   } catch (err) {
//     throw err;
//   }
// }

const user = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id
    };
  } catch (err) {
    throw err;
  }
};

const transformQuestion = question => {
  return {
    ...question._doc,
    _id: question.id,
  };
};

// probably have to transform question and user to return all user and question info to mongodb
const transformFeedback = feedback => {
  return {
    ...feedback._doc,
    _id: feedback.id,
    user: user.bind(this, feedback._doc.user),
    question: singleQuestion.bind(this, feedback._doc.question)
  };
};

exports.transformQuestion = transformQuestion;
exports.transformFeedback = transformFeedback;

