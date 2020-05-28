import React, {Component} from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'

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
			let eMessage = this.state.data.toString() + " " +this.state.url
			return <Alert variant="danger" dismissible>{eMessage}</Alert>
		}
		const page = this.state.data.map(item => <ServerConfigRow key={item.id} item={item}/>)
		return (
			<div>
			<PageHeader title="Backend configuration"/>

			<div className="intro">
			These are all the configuration properties GreenMail HTTP was started with.
			</div>
			{page}
			</div>
		)
	}
}

export default ServerConfigPage
