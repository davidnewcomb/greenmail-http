import React, {Component} from 'react'


class PrintPassword extends Component {

	constructor(props) {
		super(props)
		this.state = {
			hide: true
		}
	}

	clickHandler = () => {
		this.setState({
			hide: !this.state.hide
		})
	}

	hidePassword() {
		return "*".repeat(this.props.text.length)
	}

	render() {
		let text = this.state.hide ? this.hidePassword() : this.props.text
		return (
			<div onClick={this.clickHandler}>
			{text}
			</div>
		)
	}
}

export default PrintPassword
