import { Sequelize } from "sequelize";

import { combineResolvers } from "graphql-resolvers";
import { isAuth, isMessageOwner } from "../../utils/authorization";

module.exports = {
	Query: {
		getMessages: async (_, { cursor, limit = 100 }, { models }) => {
			return await models.Message.findAll({
				order: [["createdAt", "DESC"]],
				limit,
				where: cursor
					? {
							createdAt: {
								[Sequelize.Op.lt]: cursor
							}
					  }
					: null
			});
		},
		getMessage: async (_, { id }, { models }) => {
			return await models.Message.findByPl(id);
		}
	},
	Mutation: {
		createMessage: combineResolvers(
			isAuth,
			async (_, { body }, { me, models }) => {
				try {
					return await models.Message.create({
						body,
						userId: me.id,
						createdAt: new Date().toUTCString()
					});
				} catch (err) {
					throw new Error(err);
				}
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
	Message: {
		user: async (message, args, { models }) => {
			return await models.User.findByPk(message.userId);
		}
	}
};
