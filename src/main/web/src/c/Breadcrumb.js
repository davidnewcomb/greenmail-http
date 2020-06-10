import React, {Component} from 'react'
import {Link} from "react-router-dom"
import DeleteIcon from '@material-ui/icons/Delete'
import {BreadcrumbContext} from '../c/breadcrumbContext'
import {Button} from '@material-ui/core'

class Breadcrumb extends Component {

	static contextType = BreadcrumbContext

	deleteBreadcrumb = () => {
		this.context.removeBreadcrumb(this.props.breadcrumbId)
	}

	render() {

		const style = {
			'color': '#000000',
			'backgroundColor': 'lightgrey',
			'borderRadius' : '6px',
			'padding' : '2px 10px',
			'border': 'solid darkgrey 1px'
		}
		const gap_style = {
			'padding': '0px 0px 0px 15px'
		}
		return (

			<li className="list-inline-item" style={style}>
				<Button onClick={this.deleteBreadcrumb}>
					<DeleteIcon/>
				</Button>
				<Link style={gap_style} to={this.props.link} title={this.props.title}>
					{this.props.title}
				</Link>
			</li>
		)
	}
}

export default Breadcrumb
