const questionResolver = require('../resolvers/questions');
const userResolver = require('../resolvers/user');
const feedResolver = require('../resolvers/feedback');

const rootResolver = {
  ...questionResolver,
  ...userResolver,
  ...feedResolver
};

module.exports = rootResolver;
