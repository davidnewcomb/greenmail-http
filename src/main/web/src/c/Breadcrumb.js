import React, {Component} from 'react'
import {Link} from "react-router-dom";

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
			<div style={style}>
			<Link to={this.props.link} title={this.props.title}>{this.props.title}</Link>
			</div>
		)
        }

}
export default Breadcrumb
