import { AuthenticationError, UserInputError } from "apollo-server";

import validateRegistration from "../../utils/validation";
import createToken from "../../utils/createToken";

module.exports = {
	Query: {
		me: async (parent, args, { models, me }) => {
			if (!me) {
				return null;
			}

			return await models.User.findByPk(me.id);
		},
		getUser: async (parent, { id }, { models }) => {
			return await models.User.findByPk(id);
		},
		getUsers: async (parent, args, { models }) => {
			return await models.User.findAll();
		}
	},

	Mutation: {
		register: async (
			_,
			{ username, email, password, confirmPassword },
			{ models }
		) => {
			const { valid, errors } = validateRegistration(
				username,
				email,
				password,
				confirmPassword
			);

			if (!valid) {
				throw new UserInputError("ERRORS: ", { errors });
			}

			const user = await models.User.findOne({ username });

			if (user) {
				throw new AuthenticationError("ERROR: Username already exists", {
					errors: {
						username: "This username is taken"
					}
				});
			}

			// Can hash password here like I did in MERN Stack but also caan do it in the Sequelize User Model

			const newUser = await models.User.create({
				username,
				email,
				password
			});

			const token = createToken(newUser, "30m");

			return {
				newUser,
				token
			};
		},
		login: async (_, { login, password }, { models }) => {
			const user = await models.User.findByLoginDetails(login);

			if (!user) {
				throw new UserInputError(
					"User does not exist, please check your username and password"
				);
			}

			const validPassword = await user.validatePassword(password);

			if (!validPassword) {
				throw new AuthenticationError("Password is incorrect");
			}

			const token = createToken(user, "30m");

			return {
				user,
				token
			};
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
