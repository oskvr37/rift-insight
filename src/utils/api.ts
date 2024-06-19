import { queryToString } from "./helpers";
import { REGIONS, SERVERS } from "@/types";

const RIOT_API_KEY = process.env.RIOT_API_KEY;

export async function fetchApi(url: string, revalidate = 60) {
	if (!RIOT_API_KEY) {
		throw new Error("RIOT_API_KEY env variable is not set.");
	}

	const request = await fetch(url, {
		next: {
			revalidate: revalidate,
		},
		headers: {
			"X-Riot-Token": RIOT_API_KEY,
		},
	});

	if (request.status === 404) {
		return null;
	}

	if (!request.ok) {
		throw new Error(
			`Failed to fetch API (${request.status}) - ${request.statusText}`
		);
	}

	return await request.json();
}

export async function accountByRiotId(
	gameName: string,
	tagLine: string,
	region: REGIONS
): Promise<{ puuid: string; gameName: string; tagLine: string }> {
	return await fetchApi(
		`https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
		3600
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
	const queryString = queryToString(query || {});

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

export async function championMasteryByPuuid(
	puuid: string,
	server: SERVERS,
	query?: {
		count?: number;
	}
): Promise<
	{
		puuid: string;
		championPointsUntilNextLevel: number;
		chestGranted: boolean;
		championId: number;
		lastPlayTime: number;
		championLevel: number;
		championPoints: number;
		championPointsSinceLastLevel: number;
		tokensEarned: number;
	}[]
> {
	const queryString = queryToString(query || {});

	return await fetchApi(
		`https://${server}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?${queryString}`
	);
}
