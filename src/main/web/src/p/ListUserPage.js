import React, {Component} from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Table from '@material-ui/core/Table'
import Button from '@material-ui/core/Button'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import {AddUserUrl, ListUsersUrl} from '../c/GmhUrl'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import ListUserRow from './ListUserRow'
import Fab from '@material-ui/core/Fab'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import PageHeader from '../m/PageHeader'
import Dialog from "@material-ui/core/Dialog/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions"

class ListUserPage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			data: [],
			error: false,
			openAddDialog: false,
			credentials : {
				login: '',
				password: '',
				email: ''
			}
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

	componentDidMount() {
		this.reload()
	}

	addUser = () =>{
		let url = AddUserUrl()
		axios.post(url,{
			login: this.state.credentials.login,
			email: this.state.credentials.email,
			password: this.state.credentials.password
		}).then( res => {
			this.reload()
		}, (error) => {
			this.setState({
				data: error,
				url: url,
				error: true
			})
		})
		this.handleClose()
	}

	handleOpen = () => {
		this.setState({
			openAddDialog:true
		})
	}

	handleClose = () =>{
		this.setState({
			openAddDialog:false
		})
	}

	handleChange = (event) => {
		let credentials = this.state.credentials;
		credentials[event.target.name] = event.target.value;
		this.setState({
			credentials : credentials
		});
	};


	render() {

		if (this.state.error) {
			let eMessage = this.state.data.toString() + " " +this.state.url
			return <Alert variant="danger" dismissible>{eMessage}</Alert>
		}

		return (
			<div>
				<PageHeader title="All Users"/>
				<Paper>
					<Fab variant="extended" onClick={this.handleOpen} style={{float:'right'}}>
						<PersonAddIcon/>
						Add User
					</Fab>

					<Dialog open={this.state.openAddDialog} onClose={this.handleClose} aria-labelledby="form-dialog-title">
						<ValidatorForm onSubmit={this.addUser}>
							<DialogTitle id="form-dialog-title">Add User</DialogTitle>
							<DialogContent>
								<DialogContentText>
									Enter User Details :
								</DialogContentText>
								<TextValidator
									label="Email"
									onChange={this.handleChange}
									name="email"
									type="email"
									variant="outlined"
									inputProps={{ maxLength: 60 }}
									validators={['required']}
									errorMessages={['this field is required']}
									value={this.state.credentials.email}/>
								<br/>
								<TextValidator
									label="Login"
									onChange={this.handleChange}
									name="login"
									type="text"
									variant="outlined"
									inputProps={{ maxLength: 60 }}
									validators={['required']}
									errorMessages={['this field is required']}
									value={this.state.credentials.login}/>
								<br/>
								<TextValidator
									label="Password"
									onChange={this.handleChange}
									name="password"
									type="password"
									variant="outlined"
									inputProps={{ maxLength: 60 }}
									validators={['required']}
									errorMessages={['this field is required']}
									value={this.state.credentials.password}/>

							</DialogContent>
							<DialogActions>
								<Button onClick={this.handleClose} color="primary">
									Cancel
								</Button>
								<Button type="submit" color="primary">
									Add
								</Button>
							</DialogActions>
						</ValidatorForm>
					</Dialog>

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
