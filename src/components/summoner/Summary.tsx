import { REGIONS } from "@/types";
import { gatherMatches } from "./Matches";

export default async function Summary({
	puuid,
	region,
	page,
}: {
	puuid: string;
	region: REGIONS;
	page: number;
}) {
	const matches = await gatherMatches(puuid, region, page);

	const stats: {
		dates: number[];
		wins: number;
		losses: number;
		kills: number;
		deaths: number;
		assists: number;
		team_kills: number;
		champions: string[];
		positions: string[];
		total_damage: number;
		team_damage: number;
	} = {
		dates: [],
		wins: 0,
		losses: 0,
		kills: 0,
		deaths: 0,
		assists: 0,
		team_kills: 0,
		champions: [],
		positions: [],
		total_damage: 0,
		team_damage: 0,
	};

	matches.forEach((m) => {
		const player = m.players.find((p) => p.info.puuid === puuid);
		if (!player) return;

		stats.dates.push(m.created_at);
		stats.wins += player.team.win ? 1 : 0;
		stats.losses += player.team.win ? 0 : 1;
		stats.kills += player.stats.kills;
		stats.deaths += player.stats.deaths;
		stats.assists += player.stats.assists;
		stats.team_kills += m.player_team
			.map((p) => p.stats.kills)
			.reduce((a, b) => a + b, 0);
		stats.champions.push(player.champion.name);
		stats.positions.push(player.champion.role);
		stats.total_damage +=
			player.damage.magic + player.damage.physical + player.damage.true;
		stats.team_damage += m.player_team.reduce(
			(a, b) => a + b.damage.magic + b.damage.physical + b.damage.true,
			0
		);
	});

	const damage_participation = Math.round(
		(stats.total_damage / stats.team_damage) * 100
	);

	return (
		<section className="fadein space-y-2">
			<h2>Summary</h2>
			<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-2 dark:text-slate-400">
				<div className="w-full rounded dark:bg-slate-800 bg-slate-100 shadow p-2">
					<h3>KDA</h3>
					<p className="text-2xl text-yellow-500 font-bold">
						{Math.round(((stats.kills + stats.assists) / stats.deaths) * 100) /
							100}
					</p>
					{/* <p>
						{stats.kills / 10} / {stats.deaths / 10} / {stats.assists / 10}
					</p> */}
				</div>
				<div className="w-full rounded dark:bg-slate-800 bg-slate-100 shadow p-2">
					<h3>Winrate</h3>
					<p className="text-2xl text-emerald-500 font-bold">
						{(stats.wins / (stats.wins + stats.losses)) * 100}%
					</p>
					{/* <p>
						{stats.wins}W {stats.losses}L
					</p> */}
				</div>
				<div className="w-full rounded dark:bg-slate-800 bg-slate-100 shadow p-2">
					<h3>Kill Participation</h3>
					<p className="text-2xl text-orange-500 font-bold">
						{Math.round(
							((stats.kills + stats.assists) / stats.team_kills) * 100
						)}
						%
					</p>
				</div>
				<div className="w-full rounded dark:bg-slate-800 bg-slate-100 shadow p-2">
					<h3>Damage Share</h3>
					<p className="text-2xl text-red-500 font-bold">
						{damage_participation}%
					</p>
				</div>
			</div>
			{/* <pre>{JSON.stringify(stats, null, 2)}</pre> */}
		</section>
	);
}