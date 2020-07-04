import React, {Component} from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import {ListUsersUrl} from '../c/GmhUrl'
import ListUserRow from './ListUserRow'
import Fab from '@material-ui/core/Fab'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import PageHeader from '../m/PageHeader'
import AddUserDialog from '../c/AddUserDialog'

class ListUserPage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			data: [],
			error: false,
			openAddDialog: false,
		}
		this.reload = this.reload.bind(this)
	}

	reload() {
		let url = ListUsersUrl()
		axios.get(url)
			.then( res => {
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

    openDialog = () => {
        this.setState({
            openAddDialog: true
        })
    }
	
	hideDialog = () => {
        this.setState({
            openAddDialog: false
        })
    }

	componentDidMount() {
		this.reload()
	}

	render() {

		if (this.state.error) {
			let eMessage = this.state.data.toString() + " " +this.state.url
			return <Alert variant="danger" dismissible>{eMessage}</Alert>
		}

		return (
			<div>
				<PageHeader title="All Users"/>
				<Paper>
                    <AddUserDialog show={this.state.openAddDialog} hide={this.hideDialog} reload={this.reload}/>
                    
					<Fab variant="extended" onClick={this.openDialog} style={{float:'right'}}>
						<PersonAddIcon/>
						Add User
					</Fab>

					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Actions</TableCell>
								<TableCell>Email</TableCell>
								<TableCell>Login</TableCell>
								<TableCell>Password</TableCell>
								<TableCell>Mailbox</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								this.state.data.map((user) => (
									<ListUserRow key={user.id} user={user} reload={this.reload} />
								))
							}
						</TableBody>
					</Table>
					<div>
						<Typography>
							**Passwords are hidden by default, click the stars to reveal them.
						</Typography>
					</div>
				</Paper>
			</div>
		)
	}
}

export default ListUserPage
