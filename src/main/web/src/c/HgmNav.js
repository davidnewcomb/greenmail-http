import React, {Component} from 'react'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {
  BrowserRouter as Router,
  Link,
  NavLink,
  Route
} from "react-router-dom";

class HgmNav extends Component {

	constructor(props) {
		super(props)
		this.state = {
			activeKey: ''
		}
	}

	handleSelect = (eventKey, nav) => {
		console.log(`handleSelect:${this.state.activeKey}`)
		this.setState({
			activeKey: eventKey
		})
	}

	render() {

		return (
<Nav variant="pills" activeKey={this.state.activeKey} onSelect={this.handleSelect}>
      <Nav.Item>
        <Nav.Link eventKey="1" as={NavLink} to="/c/g" title="Server config">
          Config
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="2" as={NavLink} to="/u/all" title="List all users">
          Users
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="3" as={NavLink} to="/m/all" title="List all messages">
          Messages
        </Nav.Link>
      </Nav.Item>
      <NavDropdown title="Reset" id="nav-dropdown">
        <NavDropdown.Item eventKey="4.1" as={NavLink} to="/sys/delete_mails" title="Remove all emails">Emails</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item eventKey="4.2" as={NavLink} to="/sys/delete_users" title="Remove all users and emails">Users</NavDropdown.Item>
      </NavDropdown>
    </Nav>
		)
	}
}

export default HgmNav
