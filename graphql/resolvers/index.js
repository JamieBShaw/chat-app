const userResolvers = require('./user');
const messageResolvers = require('./messages');

module.exports = {
  Query: {
    ...userResolvers.Query,
    ...messageResolvers.Query
  },
  Mutation: {
    ...messageResolvers.Mutation
  }
};
