import React, {Component} from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent/DialogContent'
import axios from 'axios'
import {SendEmailUrl} from '../c/GmhUrl'
import SendIcon from '@material-ui/icons/Send'
import TextField from '@material-ui/core/TextField'
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import EditIcon from '@material-ui/icons/Edit'
import {Tooltip} from '@material-ui/core'

class ComposeEmailDialog extends Component{

    constructor(props){
        super(props)
        this.state = {
            openEmailDialog: false,
            errorMessage: '',
            email: {
                to: '',
                from: '',
                subject: '',
                msg: ''
            }
        }
    }

    openDialog = () => {
        this.setState({
            openEmailDialog: true
        })
    }

    sendEmail = () => {
        let url = SendEmailUrl()
        axios.post(url,{
            to: this.state.email.to,
            from: this.state.email.from,
            subject: this.state.email.subject,
            msg: this.state.email.msg
        }).then( res => {
            this.closeDialog()
            this.props.reload()
        }, (error) => {
            this.setState({
                errorMessage: error.toString()
            })
        })
    }

    closeDialog = () => {
        this.setState({
            openEmailDialog: false
        })
    }

    handleChange = (event) => {
        let email = this.state.email
        email[event.target.name] = event.target.value
        this.setState({
            email : email
        })
    }

    render(){
        return (
            <span>
                <Tooltip title="Compose Email">
                    <Button onClick={this.openDialog} class="btn btn-primary" style={{margin:2}}>
                        <EditIcon/>Compose
                    </Button>
                </Tooltip>
                
                <Dialog fullWidth onClose={this.closeDialog} aria-labelledby="customized-dialog-title" open={this.state.openEmailDialog}>
                    <DialogTitle id="compose-email-title" onClose={this.closeDialog}>
                        Compose Email
                        <Button style={{float: 'right'}} onClick={this.closeDialog}>
                            <CloseIcon/>
                        </Button>
                    </DialogTitle>
                    <DialogContent dividers>

                        <Typography style={{color: 'red', marginLeft: 30}}>{this.state.errorMessage}</Typography>

                        <ValidatorForm onSubmit={this.sendEmail}>
                            <DialogContent>
                                <TextValidator
                                    label="To"
                                    style={{width: '100%'}}
                                    onChange={this.handleChange}
                                    name="to"
                                    type="email"
                                    variant="outlined"
                                    inputProps={{ maxLength: 60 }}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    value={this.state.email.to}/>
                                <br/>
                                <TextValidator
                                    label="From"
                                    style={{width: '100%'}}
                                    onChange={this.handleChange}
                                    name="from"
                                    type="email"
                                    variant="outlined"
                                    inputProps={{ maxLength: 60 }}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    value={this.state.email.from}/>
                                <br/>
                                <TextValidator
                                    label="Subject"
                                    style={{width: '100%'}}
                                    onChange={this.handleChange}
                                    name="subject"
                                    type="text"
                                    variant="outlined"
                                    inputProps={{ maxLength: 60 }}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    value={this.state.email.subject}/>
                                <TextField
                                    name="msg"
                                    label="Message Body"
                                    style={{width: '100%'}}
                                    placeholder="Type your Message"
                                    onChange={this.handleChange}
                                    multiline
                                    rows={4}
                                    value={this.state.email.msg}
                                    variant="outlined"
                                />
                            </DialogContent>

                            <Typography style={{color: 'red', marginLeft: 30}}>{this.state.errorMessage}</Typography>

                            <DialogActions>
                                <Button type="submit" color="primary">
                                    <SendIcon/>
                                    Send
                                </Button>
                            </DialogActions>
                        </ValidatorForm>
                    </DialogContent>
                </Dialog>
            </span>
        )
    }
}

export default ComposeEmailDialog