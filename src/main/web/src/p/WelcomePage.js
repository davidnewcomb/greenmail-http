import React, {Component} from 'react'
import axios from 'axios'
import packageJson from '../../package.json'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'

import SoftwareUpdateMessage from '../m/SoftwareUpdateMessage'
import CheckingSoftwareVersion from '../m/CheckingSoftwareVersion'
import SoftwareIsUpToDate from '../m/SoftwareIsUpToDate'
import {read as brainRead, write as brainWrite} from '../c/Brain'


class WelcomePage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			latest: packageJson.version,
			status: <CheckingSoftwareVersion/>
		}
	}

	componentDidMount() {
		let latestTag = brainRead('latestTag')
		if (latestTag !== null) {
			this.displayUserMessage(latestTag)
			return
		}

		axios.get("https://api.github.com/repos/davidnewcomb/greenmail-http/tags")
			.then( (response, state) => {
				const tags = response.data.map( tag => tag.name)
				const stags = tags.sort( (a,b) => a < b)
				const latestTag = stags[stags.length-1]
				brainWrite('latestTag', latestTag)
				this.displayUserMessage(latestTag)
			})
			.catch( (error) => {
				let status = <SoftwareUpdateMessage error={error.toString()}/>
				this.setState({
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
			<hr/>
			<a href="https://github.com/davidnewcomb/greenmail-http" target="blank">GreenMail HTTP on Github</a>
			</Jumbotron>
			</Container>
		)
	}

	displayUserMessage(version) {
		let status = null
		if (packageJson.version !== version) {
			status = <SoftwareUpdateMessage latest={version}/>
		} else {
			status = <SoftwareIsUpToDate/>
		}
		this.setState({
			latest: version,
			status: status
		})
		return
	}
}

export default WelcomePage
