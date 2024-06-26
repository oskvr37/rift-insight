import { REGIONS } from "@/types";
import { gatherMatches } from "./Matches";

export default async function Recently({
	puuid,
	region,
	page,
}: {
	puuid: string;
	region: REGIONS;
	page: number;
}) {
	const matches = await gatherMatches(puuid, region, page);

	const playedWith: Record<string, any> = {};
	matches.map((m) =>
		m.participants.map((p) => {
			if (p.puuid === puuid) return;
			if (playedWith[p.puuid]) {
				playedWith[p.puuid].games += 1;
				playedWith[p.puuid].win += p.win ? 1 : 0;
			} else {
				playedWith[p.puuid] = { ...p, games: 1, win: p.win ? 1 : 0 };
			}
		})
	);

	const data = Object.values(playedWith).filter((p) => p.games > 1);

	return (
		<section className="space-y-2">
			<h2>Recently played with</h2>
			<div className="space-y-2 dark:bg-slate-800 bg-slate-300 p-2 rounded dark:text-slate-300">
				{data.map((p) => (
					<div
						key={p.summonerName}
						className="flex gap-2 items-center justify-between"
					>
						<span className="mr-auto">
							{p.summonerName} #{p.riotIdTagline}
						</span>
						<progress value={p.win} max={p.games} className="h-2 w-1/3" />
						<span className="dark:text-slate-400 text-sm">
							{(100 * (p.win / p.games)).toFixed(0)}%
						</span>
					</div>
				))}
			</div>
		</section>
	);
}
