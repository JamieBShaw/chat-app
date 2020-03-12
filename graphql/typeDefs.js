import { gql } from 'apollo-server';

module.exports = gql`

	type Message {
		id: ID!
		body: String!
		username: String!
	}

	type User {
		id: ID!
		email: String!
		username: String!
		token: String!
		refreshToken: String!
		createdAt: String!
	}

	type Query {
		getMessages()
	}
`;
