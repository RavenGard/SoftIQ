const Question = require('../models/question');

const { transformQuestion } = require('./merge');

module.exports = {
  getQuestions: async () => {
        try {
            const questions = await Question.find();
            return questions.map(question => {
              return transformQuestion(question);
            });
          } catch (err) {
            throw err;
          }
    },
    createQuestion: async args => {
        const question = new Question({
            starCategory: args.questionInput.starCategory,
            questionDescription: args.questionInput.questionDescription,
            difficulty: args.questionInput.difficulty,
            tips: args.questionInput.tips
        });
        let createdQuestion;
        try {
          const result = await question.save();
          createdQuestion = transformQuestion(result);
          return createdQuestion;
        } catch (err) {
          console.log(err);
          throw err;
        }
    }
};