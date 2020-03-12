import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import cors from "cors";

import models, { sequelize } from "./models/index";

const app = express();

app.use(cors());

let users = {
	1: {
		id: "1",
		username: "Jamie Shaw"
	},
	2: {
		id: "2",
		username: "Mr Anderson"
	}
};

const schema = gql`
	type User {
		id: String!
		username: String!
		createdAt: String!
	}

	type Query {
		getUser(id: ID!): User!
		getUsers: [User!]
		me: User!
	}
`;

const me = users[1];

const resolvers = {
	Query: {
		me: () => {
			return {
				me
			};
		},
		getUser: (parent, { id }) => {
			return users[id];
		},
		getUsers: (parent, args) => {
			return Object.values(users);
		}
	}
};

const server = new ApolloServer({
	typeDefs: schema,
	resolvers
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: 8000 }, () => {
	console.log("SERVER RUNNING ON PORT:" + 8000);
});
