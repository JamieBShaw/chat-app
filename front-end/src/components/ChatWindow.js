import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useForm } from "../utils/useForm";

import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";

const ChatWindow = props => {
	const initialState = {
		body: ""
	};

	const { onChange, onSubmit, values } = useForm(
		sendMessageCallback,
		initialState
	);

	const [sendMessage, { loading }] = useMutation(SEND_MESSAGE);

	function sendMessageCallback() {
		sendMessage({
			variables: values.body
		});
	}

	return (
		<>
			<ChatMessage />
			<ChatForm
				onChange={onChange}
				onSubmit={onSubmit}
				values={values}
				loading={loading}
			/>
		</>
	);
};

const SEND_MESSAGE = gql`
	mutation createMessage($body: String!) {
		createMessage(body: $body) {
			createdAt
			body
		}
	}
`;

export default ChatWindow;
