import React, {Component} from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import {ServerConfig} from '../c/GmhUrl'
import ServerConfigRow from './ServerConfigRow'
import PageHeader from '../m/PageHeader'

class ServerConfigPage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			data: [],
			error: false
		}
	}

	componentDidMount() {
		let url = ServerConfig()
		axios.get(url)
			.then((res, status) => {
				for (let i = 0 ; i < res.data.length ; ++i) {
					res.data[i].id = i
				}
				const cfg = res.data
				this.setState({
					data: cfg
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
			let eMessage = this.state.data.toString() + " " +this.state.url;
			return <Alert variant="danger" dismissible>{eMessage}</Alert>
		}
		const page = this.state.data.map(item =>
			<ExpansionPanel key={item.id} name="status_expand_list">
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} id="panel1bh-header">
					{item.section}
				</ExpansionPanelSummary>
				<ExpansionPanelDetails key={item.id} >
					<ServerConfigRow key={item.id} item={item}/>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		)
		return (
			<Container>
			<PageHeader title="Backend configuration"/>
			{page}
			</Container>
		)
	}
}

export default ServerConfigPage
