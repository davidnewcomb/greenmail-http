import React from 'react'
import Alert from 'react-bootstrap/Alert'

function CheckingSoftwareVersion(props) {

	return (
		<Alert variant="success">
			<Alert.Heading>Hurray!</Alert.Heading>
			<div>You are on the latest version.</div>
		</Alert>
	)
}

export default CheckingSoftwareVersion
