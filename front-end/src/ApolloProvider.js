import React from "react";
import App from "./App";
import ApolloClient from "apollo-client";

import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
// import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
	uri: "http://localhost:5000/graphql",
	credentials: "same-origin"
});

// const authMiddleware = setContext((_, { headers }) => {
// 	const xToken = localStorage.getItem("token");
// 	const xRefreshToken = localStorage.getItem("refreshToken");

// 	return {
// 		headers: {
// 			...headers,
// 			"x-token": xToken ? `Bearer ${xToken}` : "",
// 			"x-refresh-token": xRefreshToken ? `Bearer ${xRefreshToken}` : ""
// 		}
// 	};
// });

const cache = new InMemoryCache();

const client = new ApolloClient({
	link: httpLink,
	cache: cache
});

export default (
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);
