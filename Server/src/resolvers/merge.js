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

exports.transformQuestion = transformQuestion;

