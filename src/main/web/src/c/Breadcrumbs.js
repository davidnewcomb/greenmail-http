import React, {Component} from 'react'
import {BreadcrumbContextConsumer} from './breadcrumbContext'
import Breadcrumb from './Breadcrumb'

class Breadcrumbs extends Component {

	// static contextType =
	constructor(props) {
		super(props)
	}

	render() {

		const style = {
			'color':'#FF0000',
			'border':'solid black 1px'
		}

		return (
			<BreadcrumbContextConsumer>
			{
				({getBreadcrumbs}) => {
					const breadcrumbs = getBreadcrumbs()
					// if (breadcrumbs.length == 0) {
					// 	return null
					// }
					return (
						<div style={style}>
						History:
						{
						breadcrumbs.map( item => <Breadcrumb key={item.id} title={item.title} link={item.link}/>)
						}
						</div>
					)
				}
			}
			</BreadcrumbContextConsumer>
		)
	}
}

export default Breadcrumbs
