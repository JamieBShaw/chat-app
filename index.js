const express = require("express");
const { ApolloServer } = require("apollo-server-express");

import models, { sequelize } from "./models/index";

const app = express();

const server = new ApolloServer({
	typeDefs: schema,
	resolvers
});

sequelize.sync;
