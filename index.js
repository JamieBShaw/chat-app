import express from "express";

import jwt from "jsonwebtoken";
import http from "http";
import DataLoader from "dataloader";

import { ApolloServer, AuthenticationError } from "apollo-server-express";

import resolvers from "./graphql/resolvers/index";
import schema from "./graphql/typeDefs";
import models, { sequelize } from "./models/index";

const app = express();

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

const batchUsers = async (keys, models) => {
	const users = await models.User.findAll({
		where: {
			id: {
				$in: keys
			}
		}
	});

	return keys.map(key => users.find(user => user.id === key));
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
	context: async ({ req, connection }) => {
		if (connection) {
			return {
				models
			};
		}

		if (req) {
			const me = await getMe(req);

			return {
				models,
				me,
				secret: process.env.SECRET,
				loaders: {
					user: new DataLoader(keys => batchUsers(keys, models))
				}
			};
		}
	}
});

server.applyMiddleware({ app, path: "/graphql" });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const eraseDatabaseOnSync = true;

sequelize
	.sync({
		force: eraseDatabaseOnSync
	})
	.then(async () => {
		if (eraseDatabaseOnSync) {
			createUsersWithMessages(new Date());
		}

		httpServer.listen({ port: 5000 }, () => {
			console.log("SERVER RUNNING ON PORT:" + 5000 + "/graphql");
		});
	});

const createUsersWithMessages = async date => {
	await models.User.create(
		{
			username: "JamieBShaw",
			email: "jamiebshaw@gmail.com",
			password: "password",
			role: "ADMIN",
			room: "1",
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
			room: "2",
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
