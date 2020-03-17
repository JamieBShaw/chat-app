import { gql } from "apollo-server";

const schema = gql`
	type Message {
		id: ID!
		body: String!
		user: User!
		createdAt: String!
	}

	type MessageCreated {
		message: Message!
	}

	type User {
		id: String!
		username: String!
		email: String!
		role: String
		messages: [Message]!
		createdAt: String!
		token: String!
	}
	type Query {
		getMessages(cursor: String, limit: Int): [Message]!
		getMessage(id: ID!): Message!

		getUser(id: ID!): User!
		getUsers: [User!]
		me: User!
	}

	type Mutation {
		createMessage(body: String!): Message!
		deleteMessage(id: ID!): Boolean!

		register(
			username: String!
			email: String!
			password: String!
			confirmPassword: String!
		): User!

		login(login: String!, password: String!): User!

		deleteUser(id: ID!): Boolean!
	}

	type Subscription {
		messageCreated: MessageCreated!
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
