import React, {
	Component
} from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'

import {ListUsersUrl} from '../c/HgmUrl'
import UsersRow from './UsersRow'

function WelcomePage() {

	return (
		<div>
			<h1>Welcome</h1>
			<p>Hi there!</p>
		</div>
	)
}

export default WelcomePage
