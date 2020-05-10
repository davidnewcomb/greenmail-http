import React, {
	Component
} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'

import {DeleteMailbox} from '../c/HgmUrl'
import ListFoldersRow from './ListFoldersRow'

class DeleteFolderPage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			data: [],
			error: false
		}
	}

	componentDidMount() {
		console.log("***** componentDidMount")
		let {email} = this.props.match.params

		let url = DeleteMailbox(email)
		axios.get(url)
			.then(res => {
				console.log(res)
				for(let i = 0 ; i < res.data.length ; ++i) {
					res.data[i].id = '' + i
				}
				this.setState({
					data: res.data
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
		return <ListFoldersPage email={this.props.match.params} />
	}
}

export default DeleteFolderPage
