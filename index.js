import express from 'express';
import cors from 'cors';

import { ApolloServer, gql } from 'apollo-server-express';

import resolvers from './graphql/resolvers/index';
import schema from './graphql/typeDefs';

import models, { sequelize } from './models/index';

const app = express();

app.use(cors());

let users = {
  1: {
    id: '1',
    username: 'Jamie Shaw'
  },
  2: {
    id: '2',
    username: 'Mr Anderson'
  }
};

const me = users[1];

const server = new ApolloServer({
  typeDefs: schema,
  resolvers
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('SERVER RUNNING ON PORT:' + 8000);
});
