import React, {
	Component
} from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'

import {ServerConfig} from '../c/HgmUrl'
import ServerConfigRow from './ServerConfigRow'

class ServerConfigPage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			data: [],
			error: false
		}
	}

	componentDidMount() {
		let url = ServerConfig()
		axios.get(url)
			.then(res => {
				for (let i = 0 ; i <res.data.length ; ++i) {
					res.data[i].id = '' + i
					for (let j = 0 ; j <res.data.length ; ++j) {
						res.data[i].properties[j].id = i + '.' + j
					}
				}
				const cfg = res.data
				this.setState({
					data: cfg
				})
			}, (error) => {
				this.setState({
					data: error,
					url: url,
					error: true
				})
			})
	}

	render() {
		if (this.state.error) {
			let eMessage = this.state.data.toString() + " " +this.state.url
			return <Alert variant="danger" dismissible>{eMessage}</Alert>
		}
		const page = this.state.data.map(item => <ServerConfigRow key={item.id} item={item}/>)
		return <div>{page}</div>
	}
}

export default ServerConfigPage
