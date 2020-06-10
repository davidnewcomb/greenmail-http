import React, {Component} from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import Paper from '@material-ui/core/Paper'
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
		const title = "Folders: " + this.state.email
		this.context.addBreadcrumb(title, hereUrl)
	}

	render() {

		if (this.state.error) {
			const eMessage = this.state.data.toString() + " " +this.state.url
			return <Alert variant="danger" dismissible>{eMessage}</Alert>
		}

		return (
			<div>
				<PageHeader title={`Mailboxes: ${this.state.email}`}/>

				<Paper>
					<Table className="table">
						<TableHead>
							<TableRow>
								<TableCell>Actions</TableCell>
								<TableCell>FQN</TableCell>
								<TableCell>Name</TableCell>
								<TableCell># Messages</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								this.state.data.map((folder) => (
									<ListFolderRow key={folder.id} email={this.state.email} folder={folder} reload={this.reload}/>))
							}
						</TableBody>
					</Table>
				</Paper>
			</div>
		)
	}
}

export default ListFolderPage
