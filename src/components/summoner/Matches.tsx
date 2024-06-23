import { REGIONS } from "@/types";
import { FormattedMatch } from "@/app/api/summoner/[puuid]/match/[match_id]/route";

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
	// 💡 maybe we can just skip /matches route
	// and fetch cached matches here directly
	const page = 1;
	const matches: FormattedMatch[] = await fetch(
		`http://localhost:3000/api/summoner/${puuid}/matches/${page}`
	).then((res) => res.json());

	return (
		<section>
			<h1>Matches</h1>
			{matches.map((m) => (
				<Match key={m.matchId} match={m} />
			))}
		</section>
	);
}
