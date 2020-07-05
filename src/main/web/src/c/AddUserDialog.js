import React, {Component} from 'react'
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator'
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions/DialogActions'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog/Dialog'
import {AddUserUrl} from './GmhUrl'
import axios from 'axios'
import Fab from "@material-ui/core/Fab";
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import Typography from '@material-ui/core/Typography'

class AddUserDialog extends Component{

    constructor(props) {
        super(props)
        this.state = {
            openAddDialog: false,
            errorMessage: '',
            credentials : {
                login: '',
                password: '',
                email: ''
            }
        }
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
    
    addUser = () => {
        let url = AddUserUrl()
        axios.post(url,{
            login: this.state.credentials.login,
            email: this.state.credentials.email,
            password: this.state.credentials.password
        }).then( res => {
            this.hideDialog()
            this.props.reload()
        }, (error) => {
            this.setState({
               errorMessage: error.toString()
            })
        })
    }

    handleChange = (event) => {
        let credentials = this.state.credentials
        credentials[event.target.name] = event.target.value
        this.setState({
            credentials : credentials
        })
    }

    render() {
        return (
            <div>
                <Fab variant="extended" onClick={this.openDialog} style={{float:'right'}}>
                    <PersonAddIcon/>
                    Add User
                </Fab>
                
                <Dialog open={this.state.openAddDialog} onClose={this.hideDialog} aria-labelledby="form-dialog-title">
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
                        
                        <Typography style={{color: 'red', marginLeft: 30}}>{this.state.errorMessage}</Typography>
                        
                        <DialogActions>
                            <Button onClick={this.hideDialog} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                Add
                            </Button>
                        </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </div>
        )
    }
}

export default AddUserDialog