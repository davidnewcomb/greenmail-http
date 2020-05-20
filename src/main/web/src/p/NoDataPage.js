import React, {
	Component
} from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'

class NoDataPage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			data: [],
			error: false
		}
	}

	componentDidMount() {
		let url = this.overrideUrl()
		axios.get(url)
			.then(res => {
				this.setState({
					data: this.overrideMessage()
				})
			}, (error) => {
				this.setState({
					data: error,
					url: url,
					error: true
				})
			})
	}

	overrideMessage() {
		return "What happened?"
	}

	overrideUrl() {
		return "http://www.example.com"
	}

	render() {
		if (this.state.error) {
			let eMessage = this.state.data.toString() + " " +this.state.url
			return <Alert variant="danger" dismissible>{eMessage}</Alert>
		}
		return this.getBody()
	}

	getBody() {
		return (
			<div>
			<h1>Result</h1>
			<div>{this.state.data}</div>
			</div>
		)
	}
}

export default NoDataPage
