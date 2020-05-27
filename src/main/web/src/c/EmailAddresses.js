import React from 'react'
import {Link} from "react-router-dom"

function EmailAddress(props) {
	const email = props.email
	const atPos = email.indexOf("@")

	if (atPos > 0) {
		let un = email.substring(0, atPos)
		let dn = email.substring(atPos+1)
		return (
			<div>
			<Link to={`/user/${email}`}>{un}</Link>
			@
			<Link to={`/domain/${dn}`}>{dn}</Link>
			</div>
		)
	}
	return (
		<div>
		<Link to={`/user/${email}`}>{email}</Link>
		</div>
	)
}

function EmailAddresses(props) {

	let emails = props.emails
	if (Array.isArray(emails)) {
		if (emails.length === 0) {
			return null
		}
		if (emails.length === 1) {
			emails = emails[0]
		} else {
			return emails.map( (email, index) => <EmailAddress key={index} email={email} />)
		}
	}
	return <EmailAddress email={emails} />
}

export default EmailAddresses
