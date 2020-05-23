
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
	return base + mappings.CONFIG_SERVER
}

export let AllImapUrl = () => {
	return base + mappings.ALL_IMAP
}

export let ListMailboxes = (email) => {
	return base + mappings.LIST_MAILBOXES.replace(':email', email)
}

export let DeleteMailboxUrl = (mailbox) => {
	let encMailbox = encodeURIComponent(mailbox)
	return base + mappings.DELETE_MAILBOX.replace(':mailbox', encMailbox)
}

export let ListFolderMessagesUrl = (mailbox) => {
	let encMailbox = encodeURIComponent(mailbox)
	return base + mappings.LIST_MESSAGES.replace(':mailbox', encMailbox)
}

export let ListUsersUrl = () => {
	return base + mappings.LIST_USERS
}

export let PurgeUsersUrl = () => {
	return base + mappings.RESET
}

export let PurgeMailsUrl = () => {
	return base + mappings.PURGE
}

export let DeleteUserUrl = (email) => {
	return base + mappings.DELETE_USER.replace(':email', email)
}

export let DeleteMessageUrl = (mailbox, uid) => {
	let encMailbox = encodeURIComponent(mailbox)
	return base + mappings.DELETE_MESSAGE.replace(':mailbox', encMailbox).replace(':uid', uid)
}

export let ViewMessageUrl = (mailbox, uid) => {
	let encMailbox = encodeURIComponent(mailbox)
	return base + mappings.VIEW_MESSAGE.replace(':mailbox', encMailbox).replace(':uid', uid)
}
