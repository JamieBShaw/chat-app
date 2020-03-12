import { gql } from 'apollo-server';

const schema = gql`
  type Message {
    id: ID!
    body: String!
    user: User!
  }

  type User {
    id: String!
    username: String!
    messages: [Message!]
    createdAt: String!
  }
  type Query {
    getMessages: [Message]!
    getMessage(id: ID!): Message!

    getUser(id: ID!): User!
    getUsers: [User!]
    me: User!
  }

  type Mutation {
    createMessage(body: String!): Message!
  }
`;

export default schema;

// module.exports = gql`
// 	type Message {
// 		id: ID!
// 		body: String!
// 		username: String!
// 	}

// 	type User {
// 		id: ID!
// 		email: String!
// 		username: String!
// 		token: String!
// 		refreshToken: String!
// 		createdAt: String!
// 	}

// 	type Query {
// 		getUser(id: ID!): User!
// 		me: User!
// 	}
// `;
