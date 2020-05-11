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
import {DeleteMessageUrl} from '../c/HgmUrl'

class ListMesssageRow extends Component {

	constructor(props) {
		super(props)
	}

	render() {

		let m = this.props.message
		let v = ''
		return (
			<tr>
				<td>
					<NavLink to={v} title="List messages">V</NavLink>
					&nbsp;|&nbsp;
					<Link to='#' onClick={() => this.deleteMessage(m.mailbox, m.uid)} title="Delete message">DM</Link>
				</td>
				<td>{m.mailbox} / {m.uid}</td>
				<td>{m.messageId}</td>
				<td>{m.from}</td>
				<td>{m.to}</td>
				<td>{m.cc}</td>
				<td>{m.bcc}</td>
				<td>{m.subject}</td>
				<td>{m.body}</td>
			</tr>
		)
	}

	deleteMessage(mailbox, uid) {
		console.log(`***** deleteMessagebox: ${mailbox}/${uid}`)
		let url = DeleteMessageUrl(mailbox, uid)
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

export default ListMesssageRow
