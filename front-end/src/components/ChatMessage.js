import React from "react";
import { Header, Segment } from "semantic-ui-react";

const ChatMessage = props => {
	return (
		<div>
			<Header as="h5">Jamie</Header>
			<Segment raised>Chat message</Segment>
		</div>
	);
};

export default ChatMessage;
