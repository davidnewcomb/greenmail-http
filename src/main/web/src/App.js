import React from 'react'
import Container from 'react-bootstrap/Container'
import HgmNav from './c/HgmNav'
import ServerConfigPage from './p/ServerConfigPage'
import WelcomePage from './p/WelcomePage'
import ListAllMessagePage from './p/ListAllMessagePage'
import ListFolderMessagePage from './p/ListFolderMessagePage'
import ListFolderPage from './p/ListFolderPage'
import ListUserPage from './p/ListUserPage'
import SystemPurgeMailsPage from './p/SystemPurgeMailsPage'
import SystemPurgeUsersPage from './p/SystemPurgeUsersPage'
import ViewMessagePage from './p/ViewMessagePage'

import {
	BrowserRouter as Router,
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
			<Route path="/u/all" exact component={ListUserPage} />
			<Route path="/m/all" exact component={ListAllMessagePage} />
			<Route path="/sys/delete_mails" exact component={SystemPurgeMailsPage} />
			<Route path="/sys/delete_users" exact component={SystemPurgeUsersPage} />
			<Route path="/user/:email/folders" exact component={ListFolderPage} />
			<Route path="/folder/:mailbox" exact component={ListFolderMessagePage} />
			<Route path="/view/:mailbox/:uid" exact component={ViewMessagePage} />
			</Switch>
		</Container>
		</Router>
	)
}

export default App
