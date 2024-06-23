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
			<div className="flex gap-2">
				{mastery.map((m) => (
					<div key={m.championId}>
						<img
							src={championIcon(m.championId)}
							alt=""
							className="rounded-xl size-16"
						/>
						<h2>{m.championLevel} lvl</h2>
						<p>{m.championPoints.toLocaleString()}</p>
					</div>
				))}
			</div>
		</section>
	);
}
