import React from 'react'
import Container from 'react-bootstrap/Container'
import HgmNav from './c/HgmNav'
import MainBody from './c/MainBody'
import ServerConfigPage from './p/ServerConfigPage'
import UsersPage from './p/UsersPage'
import WelcomePage from './p/WelcomePage'
import MessagesPage from './p/MessagesPage'
import SystemPurgeMailsPage from './p/SystemPurgeMailsPage'
import SystemPurgeUsersPage from './p/SystemPurgeUsersPage'
import ListFoldersPage from './p/ListFoldersPage'

import {
	BrowserRouter as Router,
	Link,
	NavLink,
	Switch,
	Route
} from "react-router-dom";

function App() {
	return (
		<Router>
		<Container>
			<HgmNav/>

			<Switch>
			<Route path="/" exact component={WelcomePage} />
			<Route path="/c/g" exact component={ServerConfigPage} />
			<Route path="/u/all" exact component={UsersPage} />
			<Route path="/m/all" exact component={MessagesPage} />
			<Route path="/sys/delete_mails" exact component={SystemPurgeMailsPage} />
			<Route path="/sys/delete_users" exact component={SystemPurgeUsersPage} />
			<Route path="/user/:email/folders" exact component={ListFoldersPage} />
			</Switch>
		</Container>
		</Router>
	)
}

export default App
