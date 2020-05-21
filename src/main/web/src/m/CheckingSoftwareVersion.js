import React from 'react'
import Alert from 'react-bootstrap/Alert'

function CheckingSoftwareVersion(props) {

	return (
		<Alert variant="warning">
			<Alert.Heading>Checking...</Alert.Heading>
			<p>Contacting Github to see if you are up to date.</p>
		</Alert>
	)
}

export default CheckingSoftwareVersion
