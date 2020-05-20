import React, {Component} from 'react'
import {BreadcrumbContextConsumer} from './breadcrumbContext'
import Breadcrumb from './Breadcrumb'

class Breadcrumbs extends Component {

	render() {

		const style = {
			'padding': '10px',
			'border': 'solid black 1px',
		}

		return (
			<BreadcrumbContextConsumer>
			{
				({getBreadcrumbs}) => {
					const breadcrumbs = getBreadcrumbs()
					if (breadcrumbs.length === 0) {
						return null
					}
					return (
						<ul className="list-inline" style={style}>
						{
						breadcrumbs.map( item => <Breadcrumb key={item.id} breadcrumbId={item.id} title={item.title} link={item.link}/>)
						}
						</ul>
					)
				}
			}
			</BreadcrumbContextConsumer>
		)
	}
}

export default Breadcrumbs
