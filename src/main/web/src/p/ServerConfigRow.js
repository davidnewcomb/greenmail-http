import React, {
	Component
} from 'react'

import PrintMap from './PrintMap'

function ServerConfigRow(props) {

	const {section, properties} = props.item
	return (<div>
		<h2>{section}</h2>
		<PrintMap theMap={properties} headerKey="Key" headerValue="Value"/>
		</div>
	)
}

export default ServerConfigRow
