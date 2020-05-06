import React, {
	Component
} from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'

import {AllImapUrl} from '../c/HgmUrl'
import MessagesRow from './MessagesRow'

class MesssagsPage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			data: [],
			error: false
		}
	}

	componentDidMount() {
		let url = AllImapUrl()
		axios.get(url)
			.then(res => {
				console.log(res)
				for(let i = 0 ; i < res.data.length ; ++i) {
					res.data[i].id = '' + i
				}
				this.setState({
					data: res.data
				})
			}, (error) => {
				this.setState({
					data: error,
					url: url,
					error: true
				})
			})
	}

	render() {

		if (this.state.error) {
			let eMessage = this.state.data.toString() + " " +this.state.url
			return <Alert variant="danger" dismissible>{eMessage}</Alert>
		}

		return (
		<Container>
		<h2>List Messages</h2>

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
				this.state.data.map(message => <MessagesRow key={message.id} message={message}/>)
			}
			</tbody>
		</Table>
		</Container>
		)
	}
}

export default MesssagsPage
