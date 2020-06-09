import React, {
	Component
} from 'react'
import {
	Link,
	NavLink
} from "react-router-dom"
import axios from 'axios'

import {DeleteUserUrl} from '../c/GmhUrl'
import PrintPassword from '../c/PrintPassword'
import DeleteIcon from '@material-ui/icons/Delete';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import EmailAddresses from '../c/EmailAddresses'
import {Tooltip} from "@material-ui/core";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class ListUserRow extends Component {

	constructor(props) {
		super(props)
		this.state = {
			deleteStyle: {color: 'black'}
		}
	}

	render() {

		let {email, password, login, qualifiedMailboxName} = this.props.user
		let l = "/user/" + email + "/folders"
		return (
			<TableRow>
				<TableCell>
					<NavLink to={l} title="List folders" style={{margin:4}}>
						<Tooltip title="List Folder">
							<FolderOpenIcon/>
						</Tooltip>
					</NavLink>
					<Link to='#' onClick={() => this.deleteUser(email)} title="Delete user" style={{margin:4}}>
						<Tooltip title="Delete User">
							<DeleteIcon/>
						</Tooltip>
					</Link>
				</TableCell>
				<TableCell style={this.state.deleteStyle}><EmailAddresses emails={email}/></TableCell>
				<TableCell>{login}</TableCell>
				<TableCell><PrintPassword text={password}/></TableCell>
				<TableCell>{qualifiedMailboxName}</TableCell>
			</TableRow>
		)
	}

	deleteUser(email) {
		this.setState({deleteStyle: {color:'red'}})
		let url = DeleteUserUrl(email)
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

export default ListUserRow
