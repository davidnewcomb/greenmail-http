import React, {
	Component
} from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'


class MessagesRow extends Component {

	constructor(props) {
		super(props)
	}

	render() {

		let m = this.props.message
		return (
			<tr>
				<td> LF | D </td>
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
}

export default MessagesRow
