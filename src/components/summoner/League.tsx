import { SERVERS } from "@/types";
import { leagueBySummoner } from "@/utils/api";

export default async function SummonerLeague({
	summoner_id,
	server,
}: {
	summoner_id: string;
	server: SERVERS;
}) {
	const league_data = await leagueBySummoner(summoner_id, server);

	const league = league_data.filter((l) => l.tier);

	// 💡 put rank chart between text and emblem

	return (
		<section className="space-y-2">
			<h2>League data</h2>
			{league.map((l) => (
				<div className="space-y-1" key={l.tier}>
					<span className="text-xs font-light">{l.queueType}</span>
					<div
						key={l.queueType}
						className={`flex gap-4 dark:bg-slate-800 bg-slate-100 px-4 rounded items-center relative overflow-hidden justify-between`}
					>
						<div className="z-10 font-thin">
							<h2 className="text-xl capitalize">
								{l.tier.toLowerCase()} {l.rank}
							</h2>
							<span className="dark:text-cyan-400">{l.leaguePoints} LP</span>
							<span className="dark:text-slate-300">
								{" "}
								{l.wins}W {l.losses}L
							</span>
						</div>
						{l.tier && (
							<img
								className="size-24 z-10"
								src={`/ranked/${l.tier.toLowerCase()}.png`}
								alt={l.tier}
							/>
						)}
						<img
							src={`/ranked/${l.tier.toLowerCase()}.png`}
							alt="Emblem"
							className="absolute w-full h-full blur-2xl object-cover scale-150 select-none touch-none pointer-events-none opacity-50 mix-blend-hard-light dark:mix-blend-normal"
						/>
					</div>
				</div>
			))}
		</section>
	);
}
