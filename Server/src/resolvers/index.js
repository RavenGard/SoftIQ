const questionResolver = require('../resolvers/questions')

const rootResolver = {
  ...questionResolver
};

module.exports = rootResolver;
