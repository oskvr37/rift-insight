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
		<section className="space-y-4">
			{league.map((l) => (
				<div className="space-y-2" key={l.tier}>
					<h2 className="">{normalizeQueueType(l.queueType)}</h2>
					<div
						key={l.queueType}
						className={`flex gap-4 dark:bg-slate-800 bg-slate-100 px-4 rounded items-center relative overflow-hidden justify-between shadow`}
					>
						<div className="z-10 font-light">
							<h3 className="text-xl capitalize">
								{l.tier.toLowerCase()} {l.rank}{" "}
								<span className="text-base dark:text-slate-400">
									{l.leaguePoints} LP
								</span>
							</h3>
							<div className="flex gap-2 dark:text-slate-400">
								<span>
									{l.wins} / {l.losses}
								</span>
								<span className="text-cyan-500 font-medium">{Math.round((l.wins / (l.wins + l.losses)) * 100)}%</span>
							</div>
						</div>
						<img
							className="size-24 z-10"
							src={`/ranked/${l.tier.toLowerCase()}.png`}
							alt={l.tier}
						/>
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

function normalizeQueueType(queueType: string) {
	switch (queueType) {
		case "RANKED_SOLO_5x5":
			return "Ranked Solo/Duo";
		case "RANKED_FLEX_SR":
			return "Ranked Flex";
		default:
			return queueType;
	}
}
