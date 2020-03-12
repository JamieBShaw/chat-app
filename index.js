import express from "express";
import cors from "cors";

import { ApolloServer, gql } from "apollo-server-express";

import resolvers from "./graphql/resolvers/index";
import schema from "./graphql/typeDefs";
//import models from "./models/data";
import models, { sequelize } from "./models/index";

const app = express();

app.use(cors());

const server = new ApolloServer({
	typeDefs: schema,
	resolvers,
	context: async () => ({
		models,
		me: await models.User.findByLogin("JamieBShaw")
	})
});

server.applyMiddleware({ app, path: "/graphql" });

const eraseDatabaseOnSync = true;

sequelize
	.sync({
		force: eraseDatabaseOnSync
	})
	.then(async () => {
		if (eraseDatabaseOnSync) {
			createUsersWithMessages();
		}

		app.listen({ port: 8000 }, () => {
			console.log("SERVER RUNNING ON PORT:" + 8000 + "/graphql");
		});
	});

const createUsersWithMessages = async () => {
	await models.User.create(
		{
			username: "JamieBShaw",
			email: "jamiebshaw@gmail.com",
			password: "password",
			messages: [
				{
					body: "This is a test message"
				}
			]
		},
		{
			include: [models.Message]
		}
	);

	await models.User.create(
		{
			username: "davidAnderson",
			email: "davidanderson@gmail.com",
			password: "password",
			messages: [
				{
					body: "happy birthday to me"
				},
				{
					body: "please work first time"
				}
			]
		},
		{
			include: [models.Message]
		}
	);
};
