import React, {Component} from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import SoftwareUpdateMessage from '../m/SoftwareUpdateMessage'
import axios from 'axios'
import packageJson from '../../package.json';


class WelcomePage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			version: packageJson.version,
			latest: packageJson.version,
			checked: false
		}
	}

	componentDidMount() {
		axios.get("https://api.github.com/repos/davidnewcomb/greenmail-http/tags")
			.then( (response, state) => {
				console.log(response);
				const tags = response.data.map( tag => tag.name)
				const stags = tags.sort( (a,b) => a < b)
				const latestTag = stags[stags.length-1]
				this.setState({
					latest: latestTag,
					checked: true
				})
			})
			.catch( (error) => {
				console.error('Error getting greenmail-http project tags', error)
			})
	}

	render() {

		const {version, latest} = this.state

		return (
			<Jumbotron>
			<h1>GreenMail HTTP</h1>
			<p>You are currently running version: {version}</p>
			{
				(version != latest) && <SoftwareUpdateMessage version={version} latest={latest}/>
			}
			</Jumbotron>
		)
	}
}

export default WelcomePage
