import React, {Component} from 'react'
import {Link, NavLink} from "react-router-dom"
import axios from 'axios'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import {DeleteMailboxUrl} from '../c/GmhUrl'
import DraftsIcon from '@material-ui/icons/Drafts'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'

class ListFolderRow extends Component {

	render() {

		let {folder} = this.props
		let l = "/folder/" + encodeURIComponent(folder.fullName)
		return (
			<TableRow hover>
				<TableCell>
					<NavLink to={l} title="List messages" style={{margin:4}}>
						<Tooltip title="List messages">
							<DraftsIcon/>
						</Tooltip>
					</NavLink>
					<Link to='#' onClick={() => this.deleteMailbox(folder.fullName)} title="Delete folder" style={{margin:4}}>
						<Tooltip title="Delete Folder">
								<DeleteIcon/>
						</Tooltip>
					</Link>
				</TableCell>
				<TableCell>{folder.fullName}</TableCell>
				<TableCell>{folder.name}</TableCell>
				<TableCell>{folder.messageCount}</TableCell>
			</TableRow>
		)
	}

	deleteMailbox(mailbox) {
		this.setState({deleteStyle: {color:'red'}})
		let url = DeleteMailboxUrl(mailbox)
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

export default ListFolderRow
