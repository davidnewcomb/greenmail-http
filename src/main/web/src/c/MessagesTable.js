import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import MessagesTableRow from './MessagesTableRow'
import {highlightcolumn} from '../css/gmh.css'

function MessagesTable(props) {

	const columnLookUp = {"from": 3, "to": 4, "cc": 5, "bcc": 6, "": -1}
	const {messages, reload, who=''} = props
	const highlightColumn = columnLookUp[who]

	return (
		<>
		<Table className="table">
			<HighlightColumn col={highlightColumn}/>
			<tbody>
			<tr>
				<th>Actions</th>
				<th>Mailbox/Id</th>
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
		<Button style={{'width':'100%'}} onClick={reload}>Refresh {who}</Button>
		</>
	)
}

function HighlightColumn(props) {

	const {col} = props

	if (col < 0) {
		return null
	}

	return (
		<colgroup>
			<col span={col} className=""/>
			<col span="1" className="highlightcolumn"/>
		</colgroup>
	)
}

export default MessagesTable
