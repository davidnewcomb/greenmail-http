import React from 'react'
import Alert from 'react-bootstrap/Alert'

function CheckingSoftwareVersion(props) {

	return (
		<Alert variant="success">
			<Alert.Heading>Hurray!</Alert.Heading>
			<p>You are on the latest version.</p>
		</Alert>
	)
}

export default CheckingSoftwareVersion
