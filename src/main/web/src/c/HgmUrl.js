import React from 'react'

//let public = {}
let base = 'http://localhost:7000'
let mappings = {
	//SERVER_CONFIG: '/',
	ALL_IMAP: '/imap',
	LIST_MAILBOXES: '/imap/:email',
	LIST_MESSAGES: '/m/:mailbox',
	LIST_USERS: '/lu',
	CONFIG_SERVER: '/cfg/greenmail',
	CONFIG_CLIENT: '/cfg/client',
	PURGE: '/p',
	RESET: '/r',
	VIEW_MESSAGE: '/v/:mailbox/:uid',
	DELETE_MESSAGE: '/d/:mailbox/:uid',
	DELETE_MAILBOX: '/m/:mailbox/delete',
	DELETE_USER: '/u/:email/delete'
}

export let ServerConfig = () => {
	console.log('sssss')
	return base + mappings.CONFIG_SERVER
}

export let AllImapUrl = () => {
	return base + mappings.ALL_IMAP
}

export let ListMailboxes = (email) => {
	return base + mappings.LIST_MAILBOXES.replace(':email', email)
}

export let ListMessagesUrl = (mailbox) => {
	return base + mappings.LIST_MESSAGES.replace(':mailbox', mailbox)
}

export let ListUsersUrl = () => {
	return base + mappings.LIST_USERS
}


//export default public
