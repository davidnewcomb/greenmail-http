import React from 'react'
import Alert from 'react-bootstrap/Alert'

function SoftwareUpdateMessage(props) {

	const {version, latest} = props

	return (
		<Alert variant="danger">
			<Alert.Heading>New software available...</Alert.Heading>
			<p>
			New version {latest} is available
			</p>
			<hr />
			<p>
			Go to https://github.com/davidnewcomb/greenmail-http
			</p>
		</Alert>
	)
}

export default SoftwareUpdateMessage
