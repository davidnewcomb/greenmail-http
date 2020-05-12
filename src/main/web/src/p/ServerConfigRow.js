import React, {
	Component
} from 'react'
import Table from 'react-bootstrap/Table'

class ServerConfigRow extends Component {

	// constructor(props) {
	// 	super(props)
	// }

	render() {
		const {section, properties} = this.props.item
		return (<div>
			<h2>{section}</h2>
			<Table>
				<tbody>
				<tr>
				<th>Key</th>
				<th>Value</th>
				</tr>
				{
				// TODO use PrintMap
				properties.map((item,index) => {
					const {name, value} = item
					return (
						<tr key={index}>
							<td>{name}</td>
							<td>{value}</td>
						</tr>
					)
					})
				}
				</tbody>
			</Table>
			</div>
		)
	}
}

export default ServerConfigRow
