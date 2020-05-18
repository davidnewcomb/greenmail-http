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
			<div style={style}>
			History:
			<BreadcrumbContextConsumer>
			{
				({getBreadcrumbs}) => {
					//console.log('getBreadcrumbs')
					const breadcrumbs = getBreadcrumbs()
					//console.log('Breadcrumbs.breadcrumbs', breadcrumbs);

					return breadcrumbs.map( item => <Breadcrumb key={item.id} title={item.title} link={item.link}/>)
				}
			}
			</BreadcrumbContextConsumer>
			</div>
		)
        }

}
export default Breadcrumbs
