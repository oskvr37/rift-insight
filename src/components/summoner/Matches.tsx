import { REGIONS } from "@/types";
import { FormattedMatch } from "@/app/api/summoner/[puuid]/match/[match_id]/route";
import { matchesByPuuid } from "@/utils/api";

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

function Match({ match }: { match: FormattedMatch }) {
	return (
		<div>
			<h2>{match.matchId}</h2>
			<div className="grid grid-cols-5 gap-2">
				{match.participants.map((p) => (
					<Participant key={p.summonerName} participant={p} />
				))}
			</div>
		</div>
	);
}

export default async function SummonerMatches({
	puuid,
	region,
}: {
	puuid: string;
	region: REGIONS;
}) {
	const LIMIT = 10;
	const page = 1;

	const matchIds = await matchesByPuuid(puuid, region, {
		count: LIMIT,
		start: LIMIT * (page - 1),
		type: "ranked",
	});

	const matches: FormattedMatch[] = [];

	// ⚡ we would use `Promise.all` here to fetch all matches at once
	// but we are rate limited by not having a production API key

	for (const matchId of matchIds) {
		await fetch(
			`http://localhost:3000/api/summoner/${puuid}/match/${matchId}`,
			{
				cache: "force-cache",
			}
		)
			.then((res) => res.json())
			.then((match) => {
				matches.push(match);
			});
	}

	return (
		<section>
			<h1>Matches</h1>
			{matches.map((m) => (
				<Match key={m.matchId} match={m} />
			))}
		</section>
	);
}
