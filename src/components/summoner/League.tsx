import { SERVERS } from "@/types";
import { leagueBySummoner } from "@/utils/api";

export default async function SummonerLeague({
	summoner_id,
	server,
}: {
	summoner_id: string;
	server: SERVERS;
}) {
	const league = await leagueBySummoner(summoner_id, server);

	return (
		<section>
			<h1>League data</h1>
			{league.map((l) => (
				<div key={l.queueType}>
					<span>{l.queueType}</span>
					<h2>
						{l.tier} {l.rank}
					</h2>
					<p>{l.leaguePoints} LP</p>
					<p>
						{l.wins}W {l.losses}L
					</p>
				</div>
			))}
		</section>
	);
}
