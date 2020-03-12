const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

import models, { sequelize } from './models/index';

const app = express();

const schema = gql`
  type User {
    username: String!
  }

  type Query {
    me: User!
  }
`;

const resolvers = {
  Query: {
    me: () => {
      return {
        username: 'Jamie Shaw'
      };
    }
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('SERVER RUNNING ON PORT:' + port);
});
