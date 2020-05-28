import React from 'react'
import Container from 'react-bootstrap/Container'
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom"

import GmhNav from './c/GmhNav'
import ServerConfigPage from './p/ServerConfigPage'
import WelcomePage from './p/WelcomePage'
import ListAllMessagePage from './p/ListAllMessagePage'
import ListDomainMessagePage from './p/ListDomainMessagePage'
import ListFolderMessagePage from './p/ListFolderMessagePage'
import ListFolderPage from './p/ListFolderPage'
import ListUserMessagePage from './p/ListUserMessagePage'
import ListUserPage from './p/ListUserPage'
import SystemPurgeMailsPage from './p/SystemPurgeMailsPage'
import SystemPurgeUsersPage from './p/SystemPurgeUsersPage'
import UnderConstruction from './p/UnderConstruction'
import ViewMessagePage from './p/ViewMessagePage'
import {BreadcrumbContextProvider} from './c/breadcrumbContext'
import Breadcrumbs from './c/Breadcrumbs'


function App() {

	return (
		<BreadcrumbContextProvider>
		<Router>
		<Container fluid>
			<GmhNav/>
			<Breadcrumbs/>

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
			<Route exact path="/user/:email" component={ListUserMessagePage} />
			<Route exact path="/folder/:mailbox" component={ListFolderMessagePage} />
			<Route exact path="/view/:mailbox/:uid" component={ViewMessagePage} />
			<Route exact path="/domain/:domain" component={ListDomainMessagePage} />
			<Route component={UnderConstruction} />
			</Switch>
		</Container>
		</Router>
		</BreadcrumbContextProvider>
	)
}

export default App
