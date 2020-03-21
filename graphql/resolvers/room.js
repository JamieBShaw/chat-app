module.exports = {
	Query: {
		getRoom: async (_, { id }, { models }) => {
			const room = await models.Room.findByPk(id);
			return room;
		},
		getRooms: async (_, __, { models }) => {
			const rooms = await models.Room.findAll();
			return rooms;
		}
	}
};
