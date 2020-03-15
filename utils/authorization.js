import { ForbiddenError } from "apollo-server";
import { skip } from "graphql-resolvers";

export const isAuth = (parent, args, { me }) => {
	me ? skip : new ForbiddenError("Not an authenticated user");
};

export const isMessageOwner = async (parent, { id }, { models, me }) => {
	const message = await models.Message.findByPk(id, { raw: true });

	if (message.userId !== me.id) {
		throw new ForbiddenError("Not authenticated as owner");
	}

	return skip;
};
