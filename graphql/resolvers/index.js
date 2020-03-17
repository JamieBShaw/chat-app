const userResolvers = require("./user");
const messageResolvers = require("./message");

module.exports = {
	Query: {
		...userResolvers.Query,
		...messageResolvers.Query
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
