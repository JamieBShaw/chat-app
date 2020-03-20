import React from "react";
import ChatWindow from "../components/ChatWindow";
import { Container } from "semantic-ui-react";

const ChatRooms = () => {
	return (
		<div>
			<Container className="form-container">
				<h2> Chat Room </h2>
				<ChatWindow />
			</Container>
		</div>
	);
};

export default ChatRooms;
