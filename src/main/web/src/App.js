import React from 'react'
//import logo from './logo.svg'
//import './App.css'
import Container from 'react-bootstrap/Container'
import HgmNav from './c/HgmNav'
import MainBody from './c/MainBody'
import ServerConfigPage from './p/ServerConfigPage'
import UsersPage from './p/UsersPage'
import WelcomePage from './p/WelcomePage'
import MessagesPage from './p/MessagesPage'

import {
  BrowserRouter as Router,
  Link,
  NavLink,
  Route
} from "react-router-dom";

function App() {
  return (
	  <Router>
	  <Container>
	  	<HgmNav/>
		<Route path="/" exact component={WelcomePage} />
		<Route path="/c/g" exact component={ServerConfigPage} />
		<Route path="/u/all" exact component={UsersPage} />
		<Route path="/m/all" exact component={MessagesPage} />
	  </Container>
	  </Router>
  )
}

export default App
