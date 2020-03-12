let users = {
  1: {
    id: '1',
    username: 'Jamie Shaw'
  },
  2: {
    id: '2',
    username: 'Mr Anderson'
  }
};

const me = users[1];

module.exports = {
  Query: {
    getUser: (parent, { id }) => {
      return users[id];
    },
    getUsers: (parent, args) => {
      return Object.values(users);
    }
  }
};
