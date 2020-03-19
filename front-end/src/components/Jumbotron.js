import React from "react";
import { Jumbotron as Jumbo, Container } from "react-bootstrap";

const Jumbotron = () => {
	return (
		<div className="page-title-home">
			<Jumbo fluid="true" className="jumbo">
				<div className="overlay">
					<Container>
						<h1 style={{ color: "white" }}>
							<span>CH@T APP </span>
						</h1>
					</Container>
				</div>
			</Jumbo>
		</div>
	);
};

export default Jumbotron;
