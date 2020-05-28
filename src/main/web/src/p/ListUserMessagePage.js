import React, {Component} from 'react'

import {BreadcrumbContext} from '../c/breadcrumbContext'
import PageHeader from '../m/PageHeader'
import EmailDestinationList from '../c/EmailDestinationList'

class ListUserMessagePage extends Component {

	static contextType = BreadcrumbContext

	componentDidMount() {
		const hereUrl = window.location.pathname
		const id = hereUrl.replace( /[^a-zA-Z0-9]/g, "")
		const title = `Emails with ${this.props.match.params.email}`
		this.context.addBanner(id, title, hereUrl)
	}

	render() {
		const email = this.props.match.params.email

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
