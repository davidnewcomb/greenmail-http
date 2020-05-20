import React, {Component} from 'react'
import {Link} from "react-router-dom"
import Octicon, {Trashcan} from '@primer/octicons-react'

class Breadcrumb extends Component {

	constructor(props) {
		super(props)
	}

	render() {

		const style = {
			'color': '#FF0000',
			'border': 'solid black 1px',
			'float': 'right'
		}
		return (
			<Link to={this.props.link} title={this.props.title}>
				<Octicon icon={Trashcan} /> {this.props.title}
			</Link>
		)
	}
}

export default Breadcrumb
