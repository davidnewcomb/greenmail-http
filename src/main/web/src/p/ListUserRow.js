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
			<tr>
				<td>
					<NavLink to={l} title="List folders">LF</NavLink>
					&nbsp;|&nbsp;
					<Link to='#' onClick={() => this.deleteUser(email)} title="Delete user">DU</Link>
				</td>
				<td style={this.state.deleteStyle}>{email}</td>
				<td>{login}</td>
				<td><PrintPassword text={password}/></td>
				<td>{qualifiedMailboxName}</td>
			</tr>
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
