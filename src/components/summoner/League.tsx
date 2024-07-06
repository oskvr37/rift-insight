import { SERVERS } from "@/types";
import { leagueBySummoner } from "@/utils/api";
import { getTierColor } from "@/utils/helpers";

export default async function SummonerLeague({
	summoner_id,
	server,
}: {
	summoner_id: string;
	server: SERVERS;
}) {
	const league_data = await leagueBySummoner(summoner_id, server);

	const league = league_data.filter((l) => l.tier);

	if (!league.length) return null;

	// 💡 put rank chart between text and emblem

	return (
		<section className="space-y-4">
			{league.map((l) => (
				<League key={l.queueType} league={l} />
			))}
		</section>
	);
}

function League({ league }: { league: any }) {
	const tier = league.tier.toLowerCase();
	const show_rank = tier !== "grandmaster" && tier !== "challenger";
	const winrate = Math.round(
		(league.wins / (league.wins + league.losses)) * 100
	);

	return (
		<div className="space-y-2">
			<h2>{normalizeQueueType(league.queueType)}</h2>
			<div className="flex gap-4 dark:bg-slate-800 bg-slate-100 px-4 rounded items-center relative overflow-hidden justify-between shadow">
				<div className="z-10 font-light">
					<h3 className="text-xl capitalize">
						{tier} {show_rank && league.rank}{" "}
						<span className="text-base dark:text-slate-400">
							{league.leaguePoints} LP
						</span>
					</h3>
					<div className="dark:text-slate-400">
						{league.wins} / {league.losses}{" "}
						<span className={`font-bold ${getTierColor(winrate / 100)}`}>
							{winrate}%
						</span>
					</div>
				</div>
				<img
					className="size-24 z-10"
					src={`/ranked/${tier}.png`}
					alt={league.tier}
				/>
				<img
					src={`/ranked/${tier}.png`}
					alt="Emblem"
					className="absolute w-full h-full blur-2xl object-cover scale-150 select-none touch-none pointer-events-none opacity-50 mix-blend-hard-light dark:mix-blend-normal"
				/>
			</div>
		</div>
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
