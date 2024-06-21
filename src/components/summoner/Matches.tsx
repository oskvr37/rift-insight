import { REGIONS } from "@/types";
import { GameData } from "@/types/match";
import { matchesByPuuid, matchById } from "@/utils/api";

// 💡 will need internal api for handling matches fetching.
// one request for user takes around 2MB of data (only 20 matches)
// so we need to store only neccessary data.

function Participant({
	participant,
}: {
	participant: GameData["info"]["participants"][0];
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
			<p>{participant.longestTimeSpentLiving} longest seconds alive</p>
			<p>{participant.totalDamageDealtToChampions} damage dealt</p>
			<p>{participant.totalDamageTaken} damage taken</p>
			<p>{participant.totalHeal} healing</p>
			<p>{participant.visionScore} vision score</p>
			<p>{participant.goldEarned} gold earned</p>
			<p>{participant.champLevel} champion level</p>
			<p>{participant.totalMinionsKilled} minions killed</p>
			<p>{participant.neutralMinionsKilled} neutral minions killed</p>
		</div>
	);
}

function Match({ match }: { match: GameData }) {
	return (
		<div>
			<h2>{match.metadata.matchId}</h2>
			<div className="grid grid-cols-5 gap-2">
				{match.info.participants.map((p) => (
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
	const matches = await matchesByPuuid(puuid, region);
	// const allMatches = await Promise.all(
	// 	matches.map((m) => matchById(m, region))
	// );
	const allMatches = [await matchById(matches[0], region)];

	return (
		<section>
			<h1>Matches</h1>
			{allMatches.map((m) => (
				<Match key={m.metadata.matchId} match={m} />
			))}
		</section>
	);
}
