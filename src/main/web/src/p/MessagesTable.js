import React, {
	Component
} from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import ListMessageRow from './ListMessageRow'

function MessagesTable(props) {

	let {messages} = props
	return (
		<Table class="table">
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
				messages.map(message => <ListMessageRow key={message.id} message={message}/>)
			}
			</tbody>
		</Table>
	)
}

export default MessagesTable
