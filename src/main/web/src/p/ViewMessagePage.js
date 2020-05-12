import React, {
	Component
} from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import {ViewMessageUrl} from '../c/HgmUrl'
import PrintMap from './PrintMap'
import {EmailAddresses} from './EmailAddress'

class ViewMessagePage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			data: {
				"headers":{},
				"flags": [],
				"to": [],
				"from": [],
				"cc": [],
				"bcc": [],
			},
			error: false
		}
	}

	componentDidMount() {
		let {mailbox, uid} = this.props.match.params

		let url = ViewMessageUrl(mailbox, uid)
		console.log(url)
		axios.get(url)
			.then(res => {
				console.log('------OK-------')
				console.log(res)
				this.setState({
					data: res.data
				})
			}, (error) => {
				console.log('------BAD-------')
				this.setState({
					data: error,
					error: true
				})
			})
	}

	render() {

		if (this.state.error) {
			let eMessage = this.state.data.toString() + " " +this.state.url
			return <Alert variant="danger" dismissible>{eMessage}</Alert>
		}

		const {headers, flags, from, to, cc, bcc, subject, body} = this.state.data
		const headerEntries = Object.entries(headers)
		console.log(to)

		return (
		<Container>
		<h2>View message</h2>
		<Table>
		<tbody>
			<tr>
				<th>Header</th>
				<td><PrintMap headerKey="Property" headerValue="Value" m={headers} /></td>
			</tr>
			<tr>
				<th>Flags</th>
				<td>{flags.map(flag => {return flag})}</td>
			</tr>
			<tr>
				<th>From</th>
				<td><EmailAddresses emails={from}/></td>
			</tr>
			<tr>
				<th>To</th>
				<td><EmailAddresses emails={to}/></td>
			</tr>
			<tr>
				<th>Cc</th>
				<td><EmailAddresses emails={cc}/></td>
			</tr>
			<tr>
				<th>Bcc</th>
				<td><EmailAddresses emails={bcc}/></td>
			</tr>

			<tr>
				<th>Subject</th>
				<td>{subject}</td>
			</tr>
			<tr>
				<th>Body</th>
				<td>{body}</td>
			</tr>
		</tbody>
		</Table>
		</Container>
		)
	}
}

export default ViewMessagePage
