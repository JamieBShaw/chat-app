module.exports = {
	Query: {
		me: (parent, args, { models, me }) => {
			if (!me) {
				return null;
			}

			return await models.User.findByPk(me.id)
			
		},
		getUser: async (parent, { id }, { models }) => {
			return await models.User.findByPk(id);
		},
		getUsers: async (parent, args, { models }) => {
			return await models.User.findAll();
		}
	},
	User: {
		messages: async (user, args, { models }) => {
			return await models.Message.findAll({
				where: {
					userId: user.id
				}
			});
		}
	}
};
