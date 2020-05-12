import React from 'react'
import Table from 'react-bootstrap/Table'


function PrintMap(props) {

	const {m, headerKey, headerValue} = props

	const mEntries = Object.entries(m)

	return (
		<Table>
		<tbody>
			<tr>
				<th>{headerKey}</th>
				<th>{headerValue}</th>
			</tr>
			{
				mEntries.map((item, index) => {
					return (
						<tr key={index}>
							<td>{item[0]}</td>
							<td>{item[1]}</td>
						</tr>
					)
				})
			}
		</tbody>
		</Table>
	)

}

export default PrintMap
