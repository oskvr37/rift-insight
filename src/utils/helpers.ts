import {
	SERVERS,
	REGIONS,
	SERVERS_UNNORMALIZED,
	SERVERS_NORMALIZED,
} from "@/types";
import { GameData } from "@/types/match";

export function queryToString(query: Record<string, any>) {
	return Object.entries(query)
		.map(([key, value]) => `${key}=${value}`)
		.join("&");
}

export function closestRegion(server: SERVERS): REGIONS {
	// find closest region to server
	if (
		server === "BR1" ||
		server === "LA1" ||
		server === "LA2" ||
		server === "NA1"
	) {
		return "americas";
	} else if (
		server === "EUN1" ||
		server === "EUW1" ||
		server === "RU" ||
		server === "TR1"
	) {
		return "europe";
	}
	return "asia";
}

export function encodeSummoner(summoner: string): string {
	// sanitizes summoner name for riot api
	return (
		summoner
			.toLowerCase()
			// replace whitespace with +
			.replace(/\s/g, "+")
			// remove special characters
			.replace(/[!@#$%^&*(),.?":{}|<>]/g, "")
			// trim multiple +
			.replace(/\++/g, "+")
			// trim leading and trailing +
			.replace(/^\++|\++$/g, "")
	);
}

export function formatMatch(match: GameData) {
	return {
		created_at: match.info.gameCreation,
		duration: match.info.gameDuration,
		match_id: match.metadata.matchId,
		players: match.info.participants.map((p) => ({
			items: [p.item0, p.item1, p.item2, p.item3, p.item4, p.item5, p.item6],
			insights: {
				multikill: p.largestMultiKill,
				killingSpree: p.largestKillingSpree,
				firstBlood: p.firstBloodKill,
			},
			champion: {
				id: p.championId,
				name: p.championName,
				level: p.champLevel,
				role: p.individualPosition,
			},
			damage: {
				magic: p.magicDamageDealtToChampions,
				physical: p.physicalDamageDealtToChampions,
				true: p.trueDamageDealtToChampions,
			},
			runes: {
				primary: p.perks.styles[0].style,
				secondary: p.perks.styles[1].style,
			},
			info: {
				puuid: p.puuid,
				summonerName: p.summonerName,
				riotIdGameName: p.riotIdGameName,
				riotIdTagline: p.riotIdTagline,
				summonerId: p.summonerId,
			},
			summoners: {
				spell1: p.summoner1Id,
				spell2: p.summoner2Id,
			},
			team: {
				id: p.teamId,
				win: p.win,
			},
			stats: {
				kills: p.kills,
				deaths: p.deaths,
				assists: p.assists,
				visionScore: p.visionScore,
				totalMinionsKilled: p.totalMinionsKilled,
				neutralMinionsKilled: p.neutralMinionsKilled,
			},
		})),
	};
}

export type FormattedMatch = ReturnType<typeof formatMatch>;

export function parseSummoner(
	summoner: string,
	normalized_server: SERVERS_NORMALIZED
) {
	const server = normalized_server.toUpperCase();

	if (typeof server !== "string" || typeof summoner !== "string") {
		throw new Error("Server and summoner must be strings");
	}
	if (!SERVERS_UNNORMALIZED[server as keyof typeof SERVERS_UNNORMALIZED]) {
		throw new Error("Invalid server");
	}

	const split = decodeURIComponent(summoner).split("-");
	if (split.length !== 2) {
		throw new Error("Invalid summoner format");
	}

	// ✨ add regex validation for gameName and tagLine

	const gameName = encodeSummoner(split[0]);
	const tagLine = split[1].toLowerCase();

	const riotServer = SERVERS_UNNORMALIZED[
		server as keyof typeof SERVERS_UNNORMALIZED
	] as SERVERS;

	// console.log("[Summoner]", { gameName, split, tagLine, riotServer });

	return { gameName, tagLine, riotServer, url: `${gameName}-${tagLine}` };
}
