const RIOT_API_KEY = process.env.RIOT_API_KEY;

export async function fetchApi(url: string) {
	if (!RIOT_API_KEY) {
		throw new Error("RIOT_API_KEY env variable is not set.");
	}

	return await fetch(url, {
		headers: {
			"X-Riot-Token": RIOT_API_KEY,
		},
	});
}
