import React, {Component} from 'react'
import {Link, NavLink} from "react-router-dom"
import axios from 'axios'
import Tooltip from "@material-ui/core/Tooltip";
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import {DeleteMessageUrl} from './GmhUrl'
import EmailAddresses from './EmailAddresses';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class MessagesTableRow extends Component {

	render() {
		let m = this.props.message;
		let v = '/view/' + encodeURIComponent(m.mailbox) + '/' + m.uid;

		return (
			<TableRow >
				<TableCell>
					<NavLink to={v} title="List messages">
						<Tooltip title="View">
							<VisibilityIcon />
						</Tooltip>

					</NavLink>
					<Link to='#' onClick={() => this.deleteMessage(m.mailbox, m.uid)} title="Delete message">
						<Tooltip title="Delete">
							<DeleteIcon/>
						</Tooltip>
					</Link>
				</TableCell>
				<TableCell>{m.mailbox} / {m.uid}</TableCell>
				<TableCell><EmailAddresses emails={m.from}/></TableCell>
				<TableCell><EmailAddresses emails={m.to}/></TableCell>
				<TableCell>{m.subject}</TableCell>
			</TableRow>
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
