import { ForbiddenError } from "apollo-server";
import { skip, combineResolvers } from "graphql-resolvers";

export const isAuth = (parent, args, { me }) => {
	me ? skip : new ForbiddenError("Not an authenticated user");
};

export const isAdmin = combineResolvers(
	isAuth,
	(parent, args, { me: { role } }) =>
		role === "ADMIN" ? skip : new ForbiddenError("Not authorized as admin")
);

export const isMessageOwner = async (parent, { id }, { models, me }) => {
	const message = await models.Message.findByPk(id, { raw: true });

	if (message.userId !== me.id) {
		throw new ForbiddenError("Not authenticated as owner");
	}

	return skip;
};
