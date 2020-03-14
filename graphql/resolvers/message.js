import { v4 as uuidv4 } from "uuid";

module.exports = {
	Query: {
		getMessages: async (parent, args, { models }) => {
			return await models.Message.findAll();
		},
		getMessage: async (parent, { id }, { models }) => {
			return await models.Message.findByPl(id);
		}
	},
	Mutation: {
		createMessage: async (parent, { body }, { me, models }) => {
			try {
				return await models.Message.create({
					body,
					userId: me.id
				});
			} catch (err) {
				throw new Error(err);
			}
		},

		deleteMessage: async (parent, { id }, { models }) => {
			return await models.Message.destroy({
				where: {
					id
				}
			});
		}
	},
	Message: {
		user: async (message, args, { models }) => {
			return await models.User.findByPk(message.userId);
		}
	}
};
