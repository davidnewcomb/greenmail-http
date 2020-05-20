import React from 'react'
import Alert from 'react-bootstrap/Alert'
import {Link} from "react-router-dom"

function SoftwareUpdateMessage(props) {

	const {latest} = props

	return (
		<Alert variant="danger">
			<Alert.Heading>New software available...</Alert.Heading>
			<p>
			New version {latest} is available
			</p>
			<hr />
			<p>
			<Link to="https://github.com/davidnewcomb/greenmail-http">GreenMail HTTP on Github</Link>
			</p>
		</Alert>
	)
}

export default SoftwareUpdateMessage
