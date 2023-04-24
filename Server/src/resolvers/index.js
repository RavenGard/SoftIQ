const questionResolver = require('../resolvers/questions');
const userResolver = require('../resolvers/user');
const feedResolver = require('../resolvers/feedback');
const tipResolver = require('../resolvers/tip');

const rootResolver = {
  ...questionResolver,
  ...userResolver,
  ...feedResolver,
  ...tipResolver
};

module.exports = rootResolver;
