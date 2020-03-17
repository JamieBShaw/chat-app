import { AuthenticationError, UserInputError } from 'apollo-server';

import { validateRegistration } from '../../utils/validation';
import createToken from '../../utils/createToken';
import { combineResolvers } from 'graphql-resolvers';
import { isAdmin } from '../../utils/authorization';

module.exports = {
  Query: {
    me: async (_, __, { models, me }) => {
      if (!me) {
        return null;
      }
      return await models.User.findByPk(me.id);
    },
    getUser: async (_, { id }, { models }) => {
      const user = await models.User.findByPk(id);
      return user;
    },
    getUsers: async (_, __, { models }) => {
      const user = await models.User.findAll();
      return user;
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
        throw new UserInputError('ERRORS: ', { errors });
      }

      const user = await models.User.findOne({ where: { username } });

      if (user) {
        throw new UserInputError('ERROR: Username already exists', {
          errors: {
            username: 'This username is taken'
          }
        });
      }

      // Can hash password here like I did in MERN Stack but also caan do it in the Sequelize User Model

      const newUser = await models.User.create({
        username,
        email,
        password
      });

      const generatedToken = createToken(newUser, '30m');

      return {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
        createdAt: new Date().toUTCString(),
        token: generatedToken
      };
    },
    login: async (_, { login, password }, { models }) => {
      const user = await models.User.findByLoginDetails(login);

      if (!user) {
        throw new UserInputError(
          'User does not exist, please check your username and password'
        );
      }

      const validPassword = await user.validatePassword(password);

      if (!validPassword) {
        throw new AuthenticationError('Password is incorrect');
      }

      const newToken = createToken(user, '30m');

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        role: user.role,
        token: newToken
      };
    },
    deleteUser: combineResolvers(isAdmin, async (_, { id }, { models }) => {
      return await models.User.destroy({
        where: { id }
      });
    })
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
