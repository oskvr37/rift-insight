import { SERVERS } from "@/types";
import { championMasteryByPuuid } from "@/utils/api";
import { championIcon } from "@/utils/dragon";

export default async function SummonerMastery({
	puuid,
	server,
}: {
	puuid: string;
	server: SERVERS;
}) {
	const mastery = await championMasteryByPuuid(puuid, server);

	return (
		<section>
			<h1>Champion Mastery</h1>
			{mastery.map(async (m) => (
				<div key={m.championId}>
					<img src={await championIcon(m.championId)} alt="" />
					<h2>{m.championLevel} lvl</h2>
					<p>{m.championPoints} points</p>
				</div>
			))}
		</section>
	);
}
