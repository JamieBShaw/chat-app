import React from "react";
import { Button, Form, Input } from "semantic-ui-react";

const ChatForm = ({ onSubmit, onChange, loading, values }) => {
	// TODO: Sort out the styling and css
	return (
		<div className="chat-form">
			<Form onSubmit={onSubmit} loading={loading}>
				<Form.Field>
					<label> Compose Message </label>
					<Input
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
		</div>
	);
};

export default ChatForm;
