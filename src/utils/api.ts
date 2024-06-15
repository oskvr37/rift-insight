const RIOT_API_KEY = process.env.RIOT_API_KEY;

type REGIONS = "americas" | "asia" | "europe" | "esports";

export async function fetchApi(url: string) {
	if (!RIOT_API_KEY) {
		throw new Error("RIOT_API_KEY env variable is not set.");
	}

	const request = await fetch(url, {
		headers: {
			"X-Riot-Token": RIOT_API_KEY,
		},
	});

	if (!request.ok) {
		throw new Error(`Failed to fetch API: ${request.statusText}`);
	}

	return await request.json();
}

export async function byRiotId(
	gameName: string,
	tagLine: string,
	region: REGIONS
): Promise<{ puuid: string; gameName: string; tagLine: string }> {
	const url = `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
	return await fetchApi(url);
}
