import React from 'react'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'


function PrintMap(props) {

	const {theMap, headerKey, headerValue} = props

	const mEntries = Object.entries(theMap).sort((a,b) => a > b)

	const containerStyle = {
		'paddingBottom': '50px'
	}
	const headerStyle = {
		'fontWeight': 'bold'
	}
	const entryStyle = {
		'borderTop': '2px solid black'
	}

	return (
		<Container style={containerStyle}>
		<Row>
		<Col style={headerStyle}>{headerKey}</Col>
		<Col style={headerStyle}>{headerValue}</Col>
		</Row>
		{
			mEntries.map((item, index) => {
				return (
					<Row style={entryStyle} key={index}>
						<Col>{item[0]}</Col>
						<Col>{item[1]}</Col>
					</Row>
				)
			})
		}
		<Row style={entryStyle}>
		</Row>
		</Container>
	)
}

export default PrintMap
