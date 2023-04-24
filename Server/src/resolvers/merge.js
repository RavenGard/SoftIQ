const Question = require("../models/question");
const User = require("../models/user");
const { dateToString } = require("../helpers/date");

const singleQuestion = async (questionId) => {
  try {
    const question = await Question.findById(questionId);
    return transformQuestion(question);
  } catch (err) {
    throw err;
  }
};

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
    };
  } catch (err) {
    throw err;
  }
};

const transformQuestion = (question) => {
  return {
    ...question._doc,
    _id: question.id,
    createdAt: dateToString(question._doc.createdAt),
    updatedAt: dateToString(question._doc.updatedAt),
  };
};

// probably have to transform question and user to return all user and question info to mongodb
const transformFeedback = (feedback) => {
  return {
    ...feedback._doc,
    _id: feedback.id,
    user: user.bind(this, feedback._doc.user),
    question: singleQuestion.bind(this, feedback._doc.question),
    createdAt: dateToString(feedback._doc.createdAt),
  };
};

const transformTips = (tip) => {
  return {
    ...tip._doc,
    _id: tip.id,
  };
};

exports.transformQuestion = transformQuestion;
exports.transformFeedback = transformFeedback;
exports.transformTips = transformTips;
