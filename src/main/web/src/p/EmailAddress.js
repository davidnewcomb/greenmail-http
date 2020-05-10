
export function EmailAddress(props) {

	render() {
		return <div>EmailAddress</div>
	}
}

export function EmailAddresses(props) {

	render() {
		props.emails.map(email => <EmailAddress key={email.id} email={email}/>)
	}
}
