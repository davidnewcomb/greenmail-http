import React, {Component} from 'react'

import {BreadcrumbContext} from '../c/breadcrumbContext'
import PageHeader from '../m/PageHeader'
import EmailDestinationList from '../c/EmailDestinationList'

class ListUserMessagePage extends Component {

	static contextType = BreadcrumbContext

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.match.params.email !== this.props.match.params.email) {
			this.updateBreadcrumbs()
		}
	}

	componentDidMount() {
		this.updateBreadcrumbs()
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

	updateBreadcrumbs() {
		const hereUrl = window.location.pathname
		const title = `Emails with ${this.props.match.params.email}`
		this.context.addBreadcrumb(title, hereUrl)
	}
}

export default ListUserMessagePage
