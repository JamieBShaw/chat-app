import { v4 as uuidv4 } from 'uuid';

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

const me = users[1];

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

module.exports = {
  Query: {
    getMessages: () => {
      return Object.values(messages);
    },
    getMessage: (parent, { id }) => {
      return messages[id];
    }
  },
  Mutation: {
    createMessage: (parent, { body }, { me }) => {
      const id = uuidv4();
      const message = {
        id,
        body,
        userId: me.id
      };

      messages[id] = message;
      users[me.id].messagesIds.push(id);

      return message;
    }
  }
};
