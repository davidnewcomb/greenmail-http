import React from 'react'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from 'react-bootstrap/Button'
import MessagesTableRow from './MessagesTableRow'
import RefreshIcon from '@material-ui/icons/Refresh';
import {Tooltip} from "@material-ui/core";
import Card from "@material-ui/core/Card";

function MessagesTable(props) {

	const columnLookUp = {"from": 3, "to": 4, "cc": 5, "bcc": 6, "": -1};
	const {messages, reload, who = ''} = props;
	const highlightColumn = columnLookUp[who];

	return (
		<div>
			<div>
				<Tooltip title="Refresh">
					<Button onClick={reload}>
						<RefreshIcon/>Refresh
					</Button>
				</Tooltip>
			</div>

			<Card>
				<Table>
					<HighlightColumn col={highlightColumn}/>
					<TableHead>
						<TableRow>
							<TableCell style={{width: '5%'}}>Actions</TableCell>
							<TableCell style={{width: '18%'}}>Mailbox/Id</TableCell>
							<TableCell style={{width: '18%'}}>From</TableCell>
							<TableCell style={{width: '18%'}}>To</TableCell>
							<TableCell>Subject</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							messages.map(message => <MessagesTableRow key={message.id} message={message} reload={reload}/>)
						}
					</TableBody>
				</Table>
			</Card>
		</div>
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
