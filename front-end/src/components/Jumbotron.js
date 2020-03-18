import React from "react";
import { Jumbotron as Jumbo, Container } from "react-bootstrap";

const Jumbotron = () => {
	return (
		<Jumbo fluid="true" className="jumbo">
			<div className="overlay">
				<Container>
					<h1 style={{ color: "white" }}> Ch@t App </h1>
				</Container>
			</div>
		</Jumbo>
	);
};

export default Jumbotron;
