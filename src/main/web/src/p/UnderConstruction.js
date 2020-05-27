
import React from 'react'
import Alert from 'react-bootstrap/Alert'

function UnderConstruction() {

	const style = {
		paddingBottom: '20px'
	}
	return (
		<Alert variant="danger" dismissible>
			<div style={style}>Sorry, under development or a bug!</div>
			<div>
				<b>Rimmer:</b> They've been naughty boys, haven't they, Mr Flibble?<br/>
				<b>"Mr Flibble":</b> Yes.<br/>
				<b>Rimmer:</b> What happens to naughty boys who've been naughty, Mr Flibble?<br/>
				<b>"Mr Flibble":</b> Uncle Arnie fries them alive with his hex vision.
			</div>
		</Alert>
		)
}

export default UnderConstruction
