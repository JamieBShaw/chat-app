import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useForm } from "../utils/useForm";

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
			<div>window</div>
			<Form onSubmit={onSubmit} loading={loading}>
				<Form.Field>
					<label> Compose Message </label>
					<input
						type="text"
						name="body"
						value={values.body}
						onChange={onChange}
					/>
					<Button
						floated="right"
						type="submit"
						color={values.body === "" ? "google plus" : "green"}>
						Send
					</Button>
				</Form.Field>
			</Form>
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
