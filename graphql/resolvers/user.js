let users = {
  1: {
    id: '1',
    username: 'Jamie Shaw',
    messageIds: [1]
  },
  2: {
    id: '2',
    username: 'Mr Anderson',
    messageIds: [2]
  }
};

let messages = {
  1: {
    id: '1',
    body: 'Hello World',
    userId: '2'
  },
  2: {
    id: '2',
    body: 'By World',
    userId: '2'
  }
};

const me = users[1];

module.exports = {
  Query: {
    me: (parent, args, { me }) => {
      return me;
    },
    getUser: (parent, { id }) => {
      return users[id];
    },
    getUsers: (parent, args) => {
      return Object.values(users);
    }
  },
  User: {
    messages: user => {
      return Object.values(message).filter(
        message => message.userId === user.id
      );
    }
  },
  Message: {
    user: message => {
      return users[message.userId];
    }
  }
};
