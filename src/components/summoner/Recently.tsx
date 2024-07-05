import { REGIONS, SERVERS_NORMALIZED } from "@/types";
import { gatherMatches } from "./Matches";
import Link from "next/link";
import { encodeSummoner } from "@/utils/helpers";

export default async function Recently({
	puuid,
	region,
	server,
	page,
}: {
	puuid: string;
	region: REGIONS;
	server: SERVERS_NORMALIZED;
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
			url: string;
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
					url: encodeSummoner(p.info.riotIdGameName),
				};
			}
		})
	);

	const data = Object.values(playedWith).filter((p) => p.matches.length > 1);

	if (!data.length) return null;

	function RecentlySummoner({ p }: { p: (typeof data)[0] }) {
		return (
			<div
				key={p.info.riotIdGameName}
				className="flex gap-2 items-center dark:bg-slate-800 bg-slate-100 px-2 py-1 rounded dark:text-slate-300 shadow"
			>
				<Link
					className="mr-auto"
					href={`/summoner/${server}/${p.url}-${p.info.riotIdTagline}`}
				>
					{p.info.riotIdGameName}{" "}
					<span className="text-sm dark:text-slate-400 font-light">
						#{p.info.riotIdTagline}
					</span>
				</Link>
				<div className="flex gap-2">
					{p.matches.map((m: boolean, index) => (
						<div
							key={index}
							className={`size-4 rounded ${
								m
									? "dark:bg-cyan-600 bg-cyan-500"
									: "dark:bg-slate-700 bg-slate-300"
							}`}
						/>
					))}
				</div>
			</div>
		);
	}

	return (
		<section className="fadein space-y-2">
			<h2>Recently played with</h2>
			<div className="space-y-1">
				{data.map((p) => (
					<RecentlySummoner key={p.info.puuid} p={p} />
				))}
			</div>
		</section>
	);
}
