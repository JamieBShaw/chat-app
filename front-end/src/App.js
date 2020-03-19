import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import { AuthProvider } from "./context/globalContext/auth";

import Login from "./pages/Login";
import ChatRooms from "./pages/ChatRooms";
import Register from "./pages/Register";
import NavBar from "./components/NavBar";

import "semantic-ui-css/semantic.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
	return (
		<AuthProvider>
			<Router>
				<Container fluid>
					<NavBar />
					<Route exact path="/rooms" component={ChatRooms} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
				</Container>
			</Router>
		</AuthProvider>
	);
}

export default App;
