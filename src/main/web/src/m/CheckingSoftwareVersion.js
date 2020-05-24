import React from 'react'
import Alert from 'react-bootstrap/Alert'

function CheckingSoftwareVersion(props) {

	return (
		<Alert variant="warning">
			<Alert.Heading>Checking...</Alert.Heading>
			<div>Contacting Github to see if you are up to date.</div>
		</Alert>
	)
}

export default CheckingSoftwareVersion
