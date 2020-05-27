import React, {Component} from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'

import {ListUserMessageUrl} from './GmhUrl'
import MessagesTable from './MessagesTable'

class EmailDestinationList extends Component {

        constructor(props) {
                super(props)
                this.state = {
			data: [],
			error: false
                }
		this.reload = this.reload.bind(this)
		this.url = ListUserMessageUrl(this.props.email, this.props.who)
        }

	componentDidMount() {
		this.reload()
	}

	reload() {
		axios.get(this.url)
			.then(res => {
				for (let i = 0 ; i < res.data.length ; ++i) {
					res.data[i].id = '' + i
				}
				this.setState({
					data: res.data
				})
			}, (error) => {
				this.setState({
					data: error,
					error: true
				})
			})

	}

        render() {

		if (this.state.error) {
			let eMessage = this.state.data.toString() + " " +this.url
			return <Alert variant="danger" dismissible>{eMessage}</Alert>
		}

                return (
                        <div>
			<b>{this.props.who}:</b>
			<MessagesTable messages={this.state.data} reload={this.reload}/>
                        </div>
                )
        }
}

export default EmailDestinationList
