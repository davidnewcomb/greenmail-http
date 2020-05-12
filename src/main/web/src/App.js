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
			<Route exact path="/">
				<WelcomePage/>
			</Route>
			<Route exact path="/c/g">
				<ServerConfigPage/>
			</Route>
			<Route exact path="/u/all">
				<ListUserPage/>
			</Route>
			<Route exact path="/m/all">
				<ListAllMessagePage/>
			</Route>
			<Route exact path="/sys/delete_mails">
				<SystemPurgeMailsPage/>
			</Route>
			<Route exact path="/sys/delete_users">
				<SystemPurgeUsersPage/>
			</Route>
			<Route exact path="/user/:email/folders" component={ListFolderPage} />
			<Route exact path="/folder/:mailbox" component={ListFolderMessagePage} />
			<Route exact path="/view/:mailbox/:uid" component={ViewMessagePage} />
			</Switch>
		</Container>
		</Router>
	)
}

export default App
