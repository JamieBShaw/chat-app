import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Rooms from './components/Rooms';
import NavBar from './components/NavBar';

import 'semantic-ui-css/semantic.min.css';

function App() {
  return (
    <Router>
      <Container>
        <NavBar />
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
      </Container>
    </Router>
  );
}

export default App;
