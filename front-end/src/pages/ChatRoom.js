import React from "react";
import ChatWindow from "../components/ChatWindow";
import { Container } from "semantic-ui-react";

const ChatRoom = () => {
	return (
		<div>
			<Container>
				<h2> Chat Room </h2>
				<ChatWindow />
			</Container>
		</div>
	);
};

export default ChatRoom;
