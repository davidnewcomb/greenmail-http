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
					xx<NavLink to={l} title="List messages">LM</NavLink>
					&nbsp;|&nbsp;
					xx<NavLink to={d} title="Delete folder">DF</NavLink>
				</td>
				<td>{folder.fullName}</td>
				<td>{folder.name}</td>
				<td>{folder.messageCount}</td>
			</tr>
		)
	}
}

export default ListFoldersRow
