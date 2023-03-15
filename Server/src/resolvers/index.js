const questionResolver = require('../resolvers/questions')
const userResolver = require('../resolvers/user');

const rootResolver = {
  ...questionResolver,
  ...userResolver
};

module.exports = rootResolver;
