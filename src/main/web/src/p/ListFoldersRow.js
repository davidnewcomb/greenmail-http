import React, {
	Component
} from 'react'
import {
  BrowserRouter as Router,
  Link,
  NavLink,
  Route
} from "react-router-dom";

import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import {DeleteMailboxUrl} from '../c/HgmUrl'

class ListFoldersRow extends Component {

	constructor(props) {
		super(props)
	}

	render() {

		let {email, folder} = this.props
		let l = "/imap/" + email
		let d = "/imap/" + email
		return (
			<tr>
				<td>
					<NavLink to={l} title="List messages">LM</NavLink>
					&nbsp;|&nbsp;
					<Link to='#' onClick={() => this.deleteMailbox(email)} title="Delete folder">DF</Link>
				</td>
				<td>{folder.fullName}</td>
				<td>{folder.name}</td>
				<td>{folder.messageCount}</td>
			</tr>
		)
	}

	deleteMailbox(email) {
		console.log("***** deleteUser: " + email)
		this.setState({deleteStyle: {color:'red'}})
		let url = DeleteMailboxUrl(email)
		axios.get(url)
			.then(res => {
				this.props.reload()
			}, (error) => {
				this.setState({
					data: error,
					url: url,
					error: true
				})
			});
	}
}

export default ListFoldersRow
