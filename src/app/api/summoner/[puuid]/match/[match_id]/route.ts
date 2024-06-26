import { NextRequest, NextResponse } from "next/server";
import { GameData } from "@/types/match";
import { matchById } from "@/utils/api";

// this route stores formatted match data

export async function GET(
	req: NextRequest,
	{
		params,
	}: {
		params: {
			puuid: string;
			match_id: string;
		};
	}
) {
	// ⚡ get correct region from puuid
	const match = await matchById(params.match_id, "europe");
	const formattedMatch = formatMatch(match);
	return NextResponse.json(formattedMatch);
}

function formatMatch(match: GameData) {
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
