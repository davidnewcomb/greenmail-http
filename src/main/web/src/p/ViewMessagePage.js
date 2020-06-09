import React, {Component} from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Table from '@material-ui/core/Table';
import {ViewMessageUrl} from '../c/GmhUrl'
import EmailAddresses from '../c/EmailAddresses'
import {BreadcrumbContext} from '../c/breadcrumbContext'
import PageHeader from '../m/PageHeader';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TableCell from "@material-ui/core/TableCell/TableCell";

class ViewMessagePage extends Component {

	static contextType = BreadcrumbContext

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
			error: false,
			value:0
		}
	}

	componentDidMount() {
		const {mailbox, uid} = this.props.match.params

		const url = ViewMessageUrl(mailbox, uid)
		axios.get(url)
			.then(res => {
				this.setState({
					data: res.data
				})
			}, (error) => {
				this.setState({
					data: error,
					error: true
				})
			})

		const hereUrl = window.location.pathname
		const title = `View: ${decodeURIComponent(mailbox)}/${uid}`
		this.context.addBreadcrumb(title, hereUrl)

	}

	handleChange = (event, newValue) => {
		this.setState({value:newValue});
	};

	getContent = () =>{
		let value = this.state.value;
		return (value == 0)?this.getMessageDetails():this.getHeaderDetails();
	};

	getHeaderDetails = () =>{
		const {headers} = this.state.data;
		const mEntries = Object.entries(headers).sort((a,b) => a > b);
		return (
			<Paper>
				<Table>
					<TableBody>
							{
								mEntries.map((item) => (
									<TableRow>
										<TableCell>{item[0]}</TableCell>
										<TableCell>{item[1]}</TableCell>
									</TableRow>
								))
							}
					</TableBody>
				</Table>
			</Paper>
		)
	};

	getMessageDetails = () =>{
		const {flags, from, to, cc, bcc, subject, body} = this.state.data;
		return(
			<Paper>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>Flags</TableCell>
							<TableCell>{flags.map(flag => {return flag})}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>From</TableCell>
							<TableCell><EmailAddresses emails={from}/></TableCell>
						</TableRow>
						<TableRow>
							<TableCell>To</TableCell>
							<TableCell><EmailAddresses emails={to}/></TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Cc</TableCell>
							<TableCell><EmailAddresses emails={cc}/></TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Bcc</TableCell>
							<TableCell><EmailAddresses emails={bcc}/></TableCell>
						</TableRow>

						<TableRow>
							<TableCell>Subject</TableCell>
							<TableCell>{subject}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Body</TableCell>
							<TableCell>{body}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</Paper>);
	};

	render() {

		if (this.state.error) {
			const eMessage = this.state.data.toString() + " " +this.state.url;
			return <Alert variant="danger" dismissible>{eMessage}</Alert>
		}

		return (
			<div>
				<PageHeader title="Message"/>
				<Paper>
					<Tabs
						value={this.state.value}
						indicatorColor="primary"
						textColor="primary"
						onChange={this.handleChange}>
						<Tab label="Message">
							{this.getMessageDetails}
						</Tab>
						<Tab label="Headers">
							headers here
						</Tab>
					</Tabs>
				</Paper>
				{
					this.getContent()
				}
			</div>
		)
	}
}

export default ViewMessagePage
