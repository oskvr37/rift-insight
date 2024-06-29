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

	// 💡 add some champion info to fill layout

	return (
		<section className="space-y-2">
			<div className="flex justify-between items-end">
				<h2>Champion Mastery</h2>
				<p className="dark:text-slate-400 text-slate-500 text-sm dark:font-light">
					See more
				</p>
			</div>
			<div className="flex gap-2 justify-between">
				{mastery.map((m) => (
					<div
						key={m.championId}
						className="w-full flex gap-2 dark:text-slate-300 dark:bg-slate-800 bg-slate-100 p-1 rounded shadow"
					>
						<img src={championIcon(m.championId)} alt="" className="size-12" />
						<div>
							<p className="dark:text-slate-400">
								<span className="text-xl dark:text-cyan-400">
									{m.championLevel}
								</span>{" "}
								lvl
							</p>
							<p className="text-sm dark:font-light">
								{m.championPoints.toLocaleString()}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
