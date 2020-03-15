import { combineResolvers } from "graphql-resolvers";
import { isAuth, isMessageOwner } from "../../utils/authorization";

module.exports = {
	Query: {
		getMessages: async (_, args, { models }) => {
			return await models.Message.findAll();
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
						userId: me.id
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
