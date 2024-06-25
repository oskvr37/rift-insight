import { REGIONS } from "@/types";
import { FormattedMatch } from "@/app/api/summoner/[puuid]/match/[match_id]/route";
import { matchesByPuuid } from "@/utils/api";
import { cache } from "react";

export const gatherMatches = cache(
	async (puuid: string, region: REGIONS, page: number) => {
		const LIMIT = 10;

		const matchIds = await matchesByPuuid(puuid, region, {
			count: LIMIT,
			start: LIMIT * (page - 1),
			type: "ranked",
		});
		const baseUrl =
			process.env.NODE_ENV === "production"
				? "https://rift-insight.vercel.app"
				: "http://localhost:3000";

		const matches: FormattedMatch[] = [];

		// ⚡ we would use `Promise.all` here to fetch all matches at once
		// but we are rate limited by not having a production API key

		for (const matchId of matchIds) {
			await fetch(`${baseUrl}/api/summoner/${puuid}/match/${matchId}`, {
				cache: "force-cache",
			})
				.then((res) => res.json())
				.then((match) => {
					matches.push(match);
				});
		}

		return matches;
	}
);

export default async function SummonerMatches({
	puuid,
	region,
}: {
	puuid: string;
	region: REGIONS;
}) {
	const matches = await gatherMatches(puuid, region, 1);
	const data: FormattedMatch["participants"][0][] = [];

	matches.map((m) =>
		m.participants.filter((p) => p.puuid === puuid).map((p) => data.push(p))
	);

	const winrate = data.filter((p) => p.win).length / data.length;

	return (
		<section>
			<h1>Matches</h1>
			<div>
				<h2>Winrate: {100 * winrate}%</h2>
			</div>
			<div className="space-y-2">
				{data.map((p) => (
					<Participant key={p.summonerName} participant={p} />
				))}
			</div>
		</section>
	);
}

function Participant({
	participant,
}: {
	participant: FormattedMatch["participants"][0];
}) {
	const bg_color = participant.win ? "bg-green-800/25" : "bg-red-800/25";

	return (
		<div className={`${bg_color} p-2 rounded`}>
			<span className="font-bold">{participant.summonerName}</span>
			{" #"}
			{participant.riotIdTagline}
			<p>
				{participant.championName} {participant.kills} / {participant.deaths} /{" "}
				{participant.assists}
			</p>
			<p>{participant.champLevel} LVL</p>
			<p>{participant.score} score</p>
		</div>
	);
}
