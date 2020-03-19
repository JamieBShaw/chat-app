import { Sequelize } from "sequelize";

import { combineResolvers } from "graphql-resolvers";
import { isAuth, isMessageOwner } from "../../utils/authorization";
import pubsub, { EVENTS } from "../subscriptions/index";

module.exports = {
	Query: {
		getMessages: async (_, { cursor, limit = 100 }, { models }) => {
			const queryOptions = cursor
				? {
						where: {
							createdAt: {
								[Sequelize.Op.lt]: cursor
							}
						}
				  }
				: null;

			return await models.Message.findAll({
				order: [["createdAt", "DESC"]],
				limit,
				...queryOptions
			});
		},
		getMessage: async (_, { id }, { models }) => {
			return await models.Message.findByPl(id);
		}
	},
	Mutation: {
		createMessage: combineResolvers(
			isAuth,
			async (_, { body, roomId }, { me, models }) => {
				const message = await models.Message.create({
					body,
					roomId,
					userId: me.id,
					createdAt: new Date().toUTCString()
				});

				pubsub.publish(EVENTS.MESSAGE.CREATED, {
					messageCreated: { message }
				});

				return message;
			}
		),
		deleteMessage: combineResolvers(
			isAuth,
			isMessageOwner,
			async (_, { id }, { models }) => {
				return await models.Message.destroy({
					where: {
						id
					}
				});
			}
		)
	},
	Subscription: {
		messageCreated: {
			subscribe: () => pubsub.asyncIterator(EVENTS.MESSAGE.CREATED)
		}
	},
	Message: {
		user: async (message, __, { loaders }) => {
			const users = await loaders.user.load(message.userId);
			console.log("USERS ARE HERE:   ", users);
			return users;
		}
	}
};
