export function status(response) {
	if (response.status >= 200 && response.status < 300) {
		console.log(response)
		return Promise.resolve(response)
	} else {
		return Promise.reject(new Error(response.statusText))
	}
}

export function json(response) {
	return JSON.parse(response)
}
