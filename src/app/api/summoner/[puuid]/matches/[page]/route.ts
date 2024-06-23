import { matchesByPuuid } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{
		params,
	}: {
		params: {
			puuid: string;
			page: string;
		};
	}
) {
	const puuid = params.puuid;
	const page = parseInt(params.page) || 1;

	const LIMIT = 20;

	// TODO add correct region
	const matches = await matchesByPuuid(puuid, "europe", {
		count: LIMIT,
		start: LIMIT * (page - 1),
		type: "ranked",
	});

	const data: any[] = [];

	for (const matchId of matches) {
		await fetch(`http://localhost:3000/api/summoner/${puuid}/match/${matchId}`)
			.then((res) => res.json())
			.then((match) => {
				data.push(match);
			});
	}

	return NextResponse.json(data);
}
