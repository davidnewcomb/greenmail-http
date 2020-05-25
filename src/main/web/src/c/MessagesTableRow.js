import React, {Component} from 'react'
import {Link, NavLink} from "react-router-dom"
import axios from 'axios'

import {DeleteMessageUrl} from './GmhUrl'
import EmailAddresses from './EmailAddresses'

class MessagesTableRow extends Component {

	render() {

		let m = this.props.message
		let v = '/view/' + encodeURIComponent(m.mailbox) + '/' + m.uid
		return (
			<tr>
				<td>
					<NavLink to={v} title="List messages">V</NavLink>
					&nbsp;|&nbsp;
					<Link to='#' onClick={() => this.deleteMessage(m.mailbox, m.uid)} title="Delete message">DM</Link>
				</td>
				<td>{m.mailbox} / {m.uid}</td>
				<td>{m.messageId}</td>
				<td><EmailAddresses emails={m.from}/></td>
				<td><EmailAddresses emails={m.to}/></td>
				<td><EmailAddresses emails={m.cc}/></td>
				<td><EmailAddresses emails={m.bcc}/></td>
				<td>{m.subject}</td>
				<td>{m.body}</td>
			</tr>
		)
	}

	deleteMessage(mailbox, uid) {
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
			})
	}

}

export default MessagesTableRow
