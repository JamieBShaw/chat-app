import React from "react";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";

import App from "./App";

const httpLink = createHttpLink({
	uri: "http://localhost:5000/graphql"
});

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
