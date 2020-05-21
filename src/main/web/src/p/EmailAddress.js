import React from 'react'

export function EmailAddresses(props) {

	return props.emails.map( (email, index) => {
				return email
			} ).join(', ')
}
