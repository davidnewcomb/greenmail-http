import React from 'react'

function PageHeader(props) {

	const {title} = props

	const dotted_line = {
		'borderBottom': 'dotted 1px'
	}
	return <h2 style={dotted_line}>{title}</h2>
}

export default PageHeader
