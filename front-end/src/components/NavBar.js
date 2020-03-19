import React, { useState } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const NavBar = () => {
	const [activeItem, setActiveItem] = useState("Home");

	const user = false;

	const handleClick = (e, { name }) => {
		setActiveItem(name);
	};
	return (
		<Menu fluid inverted size="large" color="green">
			<Menu.Item
				name="Home"
				active={activeItem === "Home"}
				onClick={handleClick}
				as={Link}
				to={"/"}>
				<Icon name={"home"} />
			</Menu.Item>
			<Menu.Menu position="right">
				<Menu.Item
					name="Chat Rooms"
					active={activeItem === "Chat Rooms"}
					onClick={handleClick}
					as={Link}
					to={"/rooms"}>
					<Icon name="discussions" />
					Chat Rooms
				</Menu.Item>
				<Menu.Item
					name={user ? "Logout" : "Login"}
					active={activeItem === "Login"}
					onClick={handleClick}
					as={Link}
					to={user ? "/" : "/login"}>
					<Icon name={user ? "sign in" : "log out"} />
					login
				</Menu.Item>
			</Menu.Menu>
		</Menu>
	);
};

export default NavBar;
