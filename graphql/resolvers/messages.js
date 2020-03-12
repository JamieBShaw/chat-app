let messages = {
  1: {
    id: '1',
    body: 'Hello World',
    user: {
      id: '1',
      username: 'Jamie Shaw'
    }
  },
  2: {
    id: '2',
    body: 'By World',
    user: {
      id: '2',
      username: 'Mr Anderson'
    }
  }
};

module.exports = {
  Query: {
    getMessages: () => {
      return Object.values(messages);
    },
    getMessage: (parent, { id }) => {
      return messages[id];
    }
  }
};
