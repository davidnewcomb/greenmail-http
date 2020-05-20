import React, {
	Component
} from 'react'
import {
  Link,
  NavLink,
  Route
} from "react-router-dom"

import axios from 'axios'
import {DeleteMailboxUrl} from '../c/HgmUrl'

class ListFolderRow extends Component {

	constructor(props) {
		super(props)
	}

	render() {

		let {email, folder} = this.props
		let l = "/folder/" + encodeURIComponent(folder.fullName)
		return (
			<tr>
				<td>
					<NavLink to={l} title="List messages">LM</NavLink>
					&nbsp;|&nbsp;
					<Link to='#' onClick={() => this.deleteMailbox(folder.fullName)} title="Delete folder">DF</Link>
				</td>
				<td>{folder.fullName}</td>
				<td>{folder.name}</td>
				<td>{folder.messageCount}</td>
			</tr>
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
