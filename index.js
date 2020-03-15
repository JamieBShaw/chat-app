import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

import { ApolloServer, AuthenticationError } from "apollo-server-express";

import resolvers from "./graphql/resolvers/index";
import schema from "./graphql/typeDefs";
//import models from "./models/data";
import models, { sequelize } from "./models/index";

const app = express();

app.use(cors());

const getMe = req => {
	const token = req.headers["x-token"];

	if (token) {
		try {
			return jwt.verify(token, process.env.SECRET);
		} catch (err) {
			throw new AuthenticationError("Your sessin has expired, please login");
		}
	}
};

const server = new ApolloServer({
	typeDefs: schema,
	resolvers,
	formatError: error => {
		const messages = error.message
			.replace("SequelizeValidationError: ", "")
			.replace("Validation error: ", "");
		return {
			...error,
			messages
		};
	},
	context: async ({ req }) => {
		const me = await getMe(req);

		return {
			models,
			me,
			secret: process.env.SECRET
		};
	}
});

server.applyMiddleware({ app, path: "/graphql" });

const eraseDatabaseOnSync = true;

sequelize
	.sync({
		force: eraseDatabaseOnSync
	})
	.then(async () => {
		if (eraseDatabaseOnSync) {
			createUsersWithMessages(new Date());
		}

		app.listen({ port: 8000 }, () => {
			console.log("SERVER RUNNING ON PORT:" + 8000 + "/graphql");
		});
	});

const createUsersWithMessages = async date => {
	await models.User.create(
		{
			username: "JamieBShaw",
			email: "jamiebshaw@gmail.com",
			password: "password",
			role: "ADMIN",
			messages: [
				{
					body: "This is a test message",
					createdAt: date.getSeconds(date.getSeconds() + 1)
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
					body: "happy birthday to me",
					createdAt: date.getSeconds(date.getSeconds() + 1)
				},
				{
					body: "please work first time",
					createdAt: date.getSeconds(date.getSeconds() + 1)
				}
			]
		},
		{
			include: [models.Message]
		}
	);
};
