export function queryToString(query: Record<string, any>) {
	return Object.entries(query)
		.map(([key, value]) => `${key}=${value}`)
		.join("&");
}
