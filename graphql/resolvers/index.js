const userResolvers = require("./user");
const messageResolvers = require("./message");

module.exports = {
	Query: {
		...userResolvers.Query,
		...messageResolvers.Query
	},
	Mutation: {
		...messageResolvers.Mutation
	},
	User: {
		...userResolvers.User
	},
	Message: {
		...messageResolvers.Message
	}
};
