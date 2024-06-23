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
		matchId: match.metadata.matchId,
		participants: match.info.participants.map((p) => ({
			puuid: p.puuid,
			summonerName: p.summonerName,
			riotIdTagline: p.riotIdTagline,
			championName: p.championName,
			kills: p.kills,
			deaths: p.deaths,
			assists: p.assists,
			longestTimeSpentLiving: p.longestTimeSpentLiving,
			totalDamageDealtToChampions: p.totalDamageDealtToChampions,
			totalDamageTaken: p.totalDamageTaken,
			totalHeal: p.totalHeal,
			visionScore: p.visionScore,
			goldEarned: p.goldEarned,
			champLevel: p.champLevel,
			totalMinionsKilled: p.totalMinionsKilled,
			neutralMinionsKilled: p.neutralMinionsKilled,
			score: p.kills + p.assists - p.deaths,
			win: p.win,
		})),
	};
}

export type FormattedMatch = ReturnType<typeof formatMatch>;
