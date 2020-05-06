import React, {
	Component
} from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'

import {ListUsersUrl} from '../c/HgmUrl'
import ServerConfigRow from './ServerConfigRow'

class UsersRow extends Component {

	constructor(props) {
		super(props)
	}

	render() {

		let {email, password, login, qualifiedMailboxName} = this.props.user
		let passwordHidden = "*".repeat(password.length)
		return (
			<tr>
				<td> LF | D </td>
				<td>{email}</td>
				<td>{login}</td>
				<td>{passwordHidden}</td>
				<td>{qualifiedMailboxName}</td>
			</tr>
		)
	}
}

export default UsersRow
