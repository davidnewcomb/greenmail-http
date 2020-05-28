import React, {Component} from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'

import {ListDomainMessageUrl} from './GmhUrl'
import MessagesTable from './MessagesTable'

class DomainDestinationList extends Component {

	constructor(props) {
		super(props)
		this.state = {
			data: [],
			error: false
		}
		this.reload = this.reload.bind(this)
	}

	componentDidMount() {
		this.reload()
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.domain !== this.props.domain) {
			this.reload()
		}
	}

	reload() {
		this.url = ListDomainMessageUrl(this.props.domain, this.props.who)
		axios.get(this.url)
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
					error: true
				})
			})

	}

	render() {
		if (this.state.error) {
			const eMessage = this.state.data.toString() + " " +this.url
			return <Alert variant="danger" dismissible>{eMessage}</Alert>
		}

		return (
			<div>
			<b>{this.props.who}:</b>
			<MessagesTable messages={this.state.data} reload={this.reload}/>
			</div>
		)
	}
}

export default DomainDestinationList
