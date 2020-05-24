import React, {Component} from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'

import {ListFolderMessagesUrl} from '../c/GmhUrl'
import MessagesTable from './MessagesTable'
import {BreadcrumbContext} from '../c/breadcrumbContext'
import PageHeader from '../m/PageHeader'

class ListFolderMesssagePage extends Component {

	static contextType = BreadcrumbContext

	constructor(props) {
		super(props)
		this.mailbox = this.props.match.params.mailbox
		this.url = ListFolderMessagesUrl(this.mailbox)
		this.state = {
			data: [],
			error: false
		}
		this.reload = this.reload.bind(this)
	}

	reload() {
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

	componentDidMount() {
		this.reload()

		const hereUrl = window.location.pathname
		const id = hereUrl.replace( /[^a-zA-Z0-9]/g, "")
		const title = `List: ${decodeURIComponent(this.mailbox)}`
		this.context.addBanner(id, title, hereUrl)
	}

	render() {

		if (this.state.error) {
			let eMessage = this.state.data.toString() + " " + this.state.url
			return <Alert variant="danger" dismissible>{eMessage}</Alert>
		}

		return (
			<Container>
			<PageHeader title="List Messages"/>

			<MessagesTable messages={this.state.data} reload={this.reload}/>
			</Container>
		)
	}
}

export default ListFolderMesssagePage
