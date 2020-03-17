import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import { AuthProvider } from "./context/authorization";

import Home from "./pages/Home";
import Login from "./pages/Login";
import ChatRooms from "./pages/ChatRooms";
import NavBar from "./components/NavBar";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

function App() {
	return (
		<AuthProvider>
			<Router>
				<Container>
					<NavBar />
					<Route exact path="/" component={Home} />
					<Route exact path="/rooms" component={ChatRooms} />
					<Route exact path="/login" component={Login} />
				</Container>
			</Router>
		</AuthProvider>
	);
}

export default App;
