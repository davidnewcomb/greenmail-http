import React from 'react'
import Alert from 'react-bootstrap/Alert'

function SoftwareUpdateMessage(props) {

	const {latest, error} = props
	let message = error ? error : `New version ${latest} is available`

	return (
		<Alert variant="danger">
			<Alert.Heading>New software available...</Alert.Heading>
			<div>{message}</div>
		</Alert>
	)
}

export default SoftwareUpdateMessage
