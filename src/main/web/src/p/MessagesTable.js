import React, {
	Component
} from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import MessagesTableRow from './MessagesTableRow'

function MessagesTable(props) {

	let {messages, reload} = props
	return (
		<Table className="table">
			<tbody>
			<tr>
				<th>Actions</th>
				<th>Mailbox/Id</th>
				<th>Message Id</th>
				<th>From</th>
				<th>To</th>
				<th>Cc</th>
				<th>Bcc</th>
				<th>Subject</th>
				<th>Body</th>
			</tr>
			{
				messages.map(message => <MessagesTableRow key={message.id} message={message} reload={reload}/>)
			}
			</tbody>
		</Table>
	)
}

export default MessagesTable
