import React, {Component} from 'react'

import {BreadcrumbContext} from '../c/breadcrumbContext'
import PageHeader from '../m/PageHeader'
import DomainDestinationList from '../c/DomainDestinationList'

class ListDomainMessagePage extends Component {

	static contextType = BreadcrumbContext

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.match.params.domain !== this.props.match.params.domain) {
			this.updateBreadcrumbs()
		}
	}

	componentDidMount() {
		this.updateBreadcrumbs()
	}

	render() {
		const domain = this.props.match.params.domain

		return (
			<div>
			<PageHeader title={`Emails with ${domain}`}/>

			<DomainDestinationList domain={domain} who="from"/>
			<DomainDestinationList domain={domain} who="to"/>
			<DomainDestinationList domain={domain} who="cc"/>
			<DomainDestinationList domain={domain} who="bcc"/>
			</div>
		)
	}

	updateBreadcrumbs() {
		const hereUrl = window.location.pathname
		const title = `@${this.props.match.params.domain}`
		this.context.addBreadcrumb(title, hereUrl)
	}
}

export default ListDomainMessagePage
