module.exports = {
  Query: {
    me: () => {
      return {
        me
      };
    },
    getUser: (parent, { id }) => {
      return users[id];
    },
    getUsers: (parent, args) => {
      return Object.values(users);
    }
  }
};
