const Question = require('../models/question');

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
    question: questions.bind(this, feedback._doc.question)
  };
};

exports.transformQuestion = transformQuestion;
exports.transformFeedback = transformFeedback;

