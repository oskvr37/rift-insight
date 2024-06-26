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
		<section className="space-y-2">
			<div className="flex justify-between">
			<h2>Champion Mastery</h2>
			<p className="dark:text-slate-300">See more</p>
			</div>
			<div className="flex gap-2 dark:text-slate-300 justify-between dark:bg-slate-800 bg-slate-100 p-2 rounded">
				{mastery.map((m) => (
					<div key={m.championId} className="flex gap-2 items-center">
						<img src={championIcon(m.championId)} alt="" className="size-12" />
						<div>
							<p className="space-x-1 text-cyan-400">
								<span className="text-xl">{m.championLevel}</span>
								<span>lvl</span>
							</p>
							<p>{m.championPoints.toLocaleString()}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
