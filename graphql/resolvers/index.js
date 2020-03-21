const userResolvers = require("./user");
const messageResolvers = require("./message");
const roomResolvers = require("./room");

module.exports = {
	Query: {
		...userResolvers.Query,
		...messageResolvers.Query,
		...roomResolvers.Query
	},
	Mutation: {
		...messageResolvers.Mutation,
		...userResolvers.Mutation
	},
	Subscription: {
		...messageResolvers.Subscription
	},
	User: {
		...userResolvers.User
	},
	Message: {
		...messageResolvers.Message
	}
};
