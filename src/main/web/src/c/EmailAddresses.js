import React from 'react'

function EmailAddress(props) {
	const email = props.email

	console.log('email='+email)
	let atPos = email.indexOf("@")
	let un = email.substring(0, atPos)
	let dn = email.substring(atPos+1)
	return (
		<div>{un}@{dn}</div>
	)
}

function EmailAddresses(props) {

	let emails = props.emails
	if (Array.isArray(emails)) {
		if (emails.length == 0) {
			return null
		}
		if (emails.length == 1) {
			emails = emails[0]
		} else {
			return emails.map( (email, index) => <EmailAddress key={index} email={email} />)
		}
	}
	return <EmailAddress email={emails} />
}

// function EmailAddress(props) {
//
// }
//
// function EmailAddresses(props) {
//
// 	const emails = props.emails
// 	if (Array.isArray(emails)) {
// 		console.log('list')
// 		return emails.map( (email, index) => {
// 					return email
// 				} ).join(', ')
// 	}
//
// 	console.log('string')
// 	return emails
// }

export default EmailAddresses
