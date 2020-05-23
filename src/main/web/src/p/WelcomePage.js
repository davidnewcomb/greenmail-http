import React, {Component} from 'react'
import axios from 'axios'
import packageJson from '../../package.json'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import {Link} from "react-router-dom"

import SoftwareUpdateMessage from '../m/SoftwareUpdateMessage'
import CheckingSoftwareVersion from '../m/CheckingSoftwareVersion'
import SoftwareIsUpToDate from '../m/SoftwareIsUpToDate'

class WelcomePage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			latest: packageJson.version,
			checked: false,
			status: <CheckingSoftwareVersion/>
		}
	}

	componentDidMount() {
		axios.get("https://api.github.com/repos/davidnewcomb/greenmail-http/tags")
			.then( (response, state) => {
				console.log(response)
				const tags = response.data.map( tag => tag.name)
				const stags = tags.sort( (a,b) => a < b)
				const latestTag = stags[stags.length-1]
				let status = null
				if (packageJson.version !== latestTag) {
					status = <SoftwareUpdateMessage latest={latestTag}/>
				} else {
					status = <SoftwareIsUpToDate/>
				}
				this.setState({
					latest: latestTag,
					checked: true,
					status: status
				})
			})
			.catch( (error) => {
				let status = <SoftwareUpdateMessage error={error.toString()}/>
				this.setState({
					checked: true,
					status: status
				})
				console.error('Error getting greenmail-http project tags', error)
			})
	}

	render() {

		return (
			<Container>
			<Jumbotron>
			<h1>GreenMail HTTP</h1>
			<div>You are currently running version: {packageJson.version}</div>
			{this.state.status}
			<p>
			<hr/>
			<Link to="https://github.com/davidnewcomb/greenmail-http">GreenMail HTTP on Github</Link>
			</p>
			</Jumbotron>
			</Container>
		)
	}
}

export default WelcomePage
