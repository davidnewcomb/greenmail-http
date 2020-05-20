import React, {
	Component
} from 'react'
import {
	useParams
} from "react-router-dom"

import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'

import {ListMailboxes} from '../c/HgmUrl'
import ListFolderRow from './ListFolderRow'
import {BreadcrumbContext} from '../c/breadcrumbContext'

class ListFolderPage extends Component {

	static contextType = BreadcrumbContext

	constructor(props) {
		super(props)

		this.state = {
			data: [],
			error: false,
			email: this.props.match.params.email
		}
		this.reload = this.reload.bind(this)
	}

	reload () {

		let email = this.state.email
		let url = ListMailboxes(email)

		axios.get(url)
			.then(res => {
				console.log(res)
				for (let i = 0 ; i < res.data.length ; ++i) {
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

	componentDidMount() {
		this.reload()

		const hereUrl = window.location.pathname
		console.log(hereUrl)
		const id = hereUrl.replace( /[^a-zA-Z0-9]/g, "")
		console.log('**ListFolderPage:id', id)
		const title = "Folders: " + this.state.email
		this.context.addBanner(id, title, hereUrl)
	}

	render() {

		if (this.state.error) {
			let eMessage = this.state.data.toString() + " " +this.state.url
			return <Alert variant="danger" dismissible>{eMessage}</Alert>
		}

		return (
		<Container>
		<h2>Mailboxes: {this.state.email}</h2>

		<Table className="table">
			<tbody>
			<tr>
				<th>Actions</th>
				<th>FQN</th>
				<th>Name</th>
				<th># Messages</th>
			</tr>
			{
				this.state.data.map(folder => <ListFolderRow key={folder.id} email={this.state.email} folder={folder} reload={this.reload}/>)
			}
			</tbody>
		</Table>
		</Container>
		)
	}
}

export default ListFolderPage
