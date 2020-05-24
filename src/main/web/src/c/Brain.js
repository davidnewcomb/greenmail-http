// Simpler than Redux!

const CFG = {
	'debug': true,
	'latestTag': null
}

export function read(k) {
	return CFG[k]
}

export function write(k, v) {
	CFG[k] = v
}
