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

	const playedWith: Record<
		string,
		{
			info: {
				riotIdGameName: string;
				riotIdTagline: string;
				puuid: string;
			};
			matches: boolean[];
		}
	> = {};
	matches.map((m) =>
		m.players.map((p) => {
			if (p.info.puuid === puuid) return;
			if (m.player.team.id !== p.team.id) return;

			if (playedWith[p.info.puuid]) {
				playedWith[p.info.puuid].matches.push(p.team.win);
			} else {
				playedWith[p.info.puuid] = {
					...p,
					matches: [p.team.win],
				};
			}
		})
	);

	const data = Object.values(playedWith).filter((p) => p.matches.length > 1);
	// ✨ handle empty state

	return (
		<section className="space-y-2">
			<h2>Recently played with</h2>
			<div className="space-y-1">
				{data.map((p) => (
					<div
						key={p.info.riotIdGameName}
						className="flex gap-2 items-center dark:bg-slate-800 bg-slate-100 px-2 py-1 rounded dark:text-slate-300 shadow"
					>
						<p className="mr-auto">
							{p.info.riotIdGameName}{" "}
							<span className="text-sm dark:text-slate-400 font-light">
								#{p.info.riotIdTagline}
							</span>
						</p>
						<div className="flex gap-2">
							{p.matches.map((m: boolean, index) => (
								<div
									key={index}
									className={`size-4 rounded ${
										m
											? "dark:bg-cyan-600 bg-cyan-400"
											: "dark:bg-slate-700 bg-slate-300"
									}`}
								/>
							))}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
