const RIOT_API_KEY = process.env.RIOT_API_KEY;

type REGIONS = "americas" | "asia" | "europe" | "esports";
type SERVERS =
	| "BR1"
	| "EUN1"
	| "EUW1"
	| "JP1"
	| "KR"
	| "LA1"
	| "LA2"
	| "NA1"
	| "OC1"
	| "PH2"
	| "RU"
	| "SG2"
	| "TH2"
	| "TR1"
	| "TW2"
	| "VN2";

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

export async function accountByRiotId(
	gameName: string,
	tagLine: string,
	region: REGIONS
): Promise<{ puuid: string; gameName: string; tagLine: string }> {
	return await fetchApi(
		`https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`
	);
}

export async function summonerByPuuid(
	puuid: string,
	server: SERVERS
): Promise<{
	id: string;
	accountId: string;
	puuid: string;
	profileIconId: number;
	revisionDate: number;
	summonerLevel: number;
}> {
	return await fetchApi(
		`https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`
	);
}

export async function matchesByPuuid(
	puuid: string,
	region: REGIONS,
	query?: {
		startTime?: number;
		endTime?: number;
		queue?: number;
		type?: string;
		start?: number;
		count?: number;
	}
): Promise<string[]> {
	const queryString = Object.entries(query || {})
		.map(([key, value]) => `${key}=${value}`)
		.join("&");

	return await fetchApi(
		`https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?${queryString}`
	);
}

export async function leagueBySummoner(
	id: string,
	server: SERVERS
): Promise<
	{
		leagueId: string;
		queueType: string;
		tier: string;
		rank: string;
		summonerId: string;
		leaguePoints: number;
		wins: number;
		losses: number;
		veteran: boolean;
		inactive: boolean;
		freshBlood: boolean;
		hotStreak: boolean;
	}[]
> {
	return await fetchApi(
		`https://${server}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`
	);
}
