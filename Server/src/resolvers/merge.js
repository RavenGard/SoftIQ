const Question = require('../models/question');
const User = require('../models/user');

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

