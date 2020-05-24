import React, {Component} from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'

import {ListMailboxes} from '../c/GmhUrl'
import ListFolderRow from './ListFolderRow'
import {BreadcrumbContext} from '../c/breadcrumbContext'
import PageHeader from '../m/PageHeader'

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
		const id = hereUrl.replace( /[^a-zA-Z0-9]/g, "")
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
		<PageHeader title={`Mailboxes: ${this.state.email}`}/>

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
