import React from 'react'
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from "@material-ui/core/TableRow";
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';

function ServerConfigRow(props) {

	const {section, properties} = props.item;
	const mEntries = Object.entries(properties).sort((a,b) => a > b);
	return (
				<Card style={{width:'80%'}}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Key</TableCell>
								<TableCell>Value</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								mEntries.map((item,index) => (
									<TableRow>
										<TableCell>{item[0]}</TableCell>
										<TableCell>{item[1]}</TableCell>
									</TableRow>
								))
							}
						</TableBody>
					</Table>
				</Card>
			)
}

export default ServerConfigRow
