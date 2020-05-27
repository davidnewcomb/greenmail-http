import React, {Component} from 'react'

import {BreadcrumbContext} from '../c/breadcrumbContext'
import PageHeader from '../m/PageHeader'
import EmailDestinationList from '../c/EmailDestinationList'

class ListUserMessagePage extends Component {

	static contextType = BreadcrumbContext

	state = {
		email: ''
	}

	constructor(props) {
		super(props)
		this.status = {
			email: this.props.match.params.email
		}
		console.log('ListUserMessagePage:constructor')
	}

	componentDidMount() {

		console.log('ListUserMessagePage:componentDidMount')
		const hereUrl = window.location.pathname
		const id = hereUrl.replace( /[^a-zA-Z0-9]/g, "")
		const title = `Emails with ${this.state.email}`
		this.context.addBanner(id, title, hereUrl)
	}

	static getDerivedStateFromProps(props, state) {
		console.log('ListUserMessagePage:getDerivedStateFromProps')
		return {
			email: props.match.params.email
		}
	}

	shouldComponentUpdate() {
		console.log('ListUserMessagePage:shouldComponentUpdate')
		console.log(arguments)
		return true
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		console.log('ListUserMessagePage:getSnapshotBeforeUpdate')
		return null
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log('ListUserMessagePage:componentDidUpdate')
	}

	render() {

		console.log('ListUserMessagePage:render')
		const {email} = this.state
		console.log('************ ' + email)
		return (
			<div>
			<PageHeader title={`Emails with ${email}`}/>

			<EmailDestinationList email={email} who="from"/>
			<EmailDestinationList email={email} who="to"/>
			<EmailDestinationList email={email} who="cc"/>
			<EmailDestinationList email={email} who="bcc"/>
			</div>
		)
	}
}

export default ListUserMessagePage
