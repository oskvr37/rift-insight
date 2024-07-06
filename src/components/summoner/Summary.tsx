import { REGIONS } from "@/types";
import { gatherMatches } from "./Matches";
import { getTierColor } from "@/utils/helpers";

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
		positions: PositionsUnion[];
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
		stats.positions.push(player.champion.role as PositionsUnion);
		stats.total_damage +=
			player.damage.magic + player.damage.physical + player.damage.true;
		stats.team_damage += m.player_team.reduce(
			(a, b) => a + b.damage.magic + b.damage.physical + b.damage.true,
			0
		);
	});

	const KDA =
		Math.round(((stats.kills + stats.assists) / stats.deaths) * 100) / 100;
	const winrate = (stats.wins / (stats.wins + stats.losses)) * 100;
	const KP = Math.round(
		((stats.kills + stats.assists) / stats.team_kills) * 100
	);
	const damage_participation = Math.round(
		(stats.total_damage / stats.team_damage) * 100
	);

	return (
		<section className="fadein space-y-2">
			<h2>Summary</h2>
			<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-2 dark:text-slate-400">
				<div className="w-full rounded dark:bg-slate-800 bg-slate-100 shadow p-2">
					<h3>KDA</h3>
					<p className={`text-2xl font-bold ${getTierColor(KDA / 5)}`}>{KDA}</p>
					{/* <p>
						{stats.kills / 10} / {stats.deaths / 10} / {stats.assists / 10}
					</p> */}
				</div>
				<div className="w-full rounded dark:bg-slate-800 bg-slate-100 shadow p-2">
					<h3>Winrate</h3>
					<p className={`text-2xl font-bold ${getTierColor(winrate / 75)}`}>
						{winrate}%
					</p>
					{/* <p>
						{stats.wins}W {stats.losses}L
					</p> */}
				</div>
				<div className="w-full rounded dark:bg-slate-800 bg-slate-100 shadow p-2">
					<h3>Kill Participation</h3>
					<p className={`text-2xl font-bold ${getTierColor(KP / 80)}`}>{KP}%</p>
				</div>
				<div className="w-full rounded dark:bg-slate-800 bg-slate-100 shadow p-2">
					<h3>Damage Share</h3>
					<p
						className={`text-2xl font-bold ${getTierColor(
							damage_participation / 30
						)}`}
					>
						{damage_participation}%
					</p>
				</div>
			</div>
			<div className="grid lg:grid-cols-1 md:grid-cols-2 gap-2">
				<div className="flex justify-between items-center dark:bg-slate-800 bg-slate-100 shadow py-1 px-2 rounded">
					<p className="dark:text-slate-400">Games last week</p>
					<Heatmap timestamps={stats.dates} />
				</div>
				<div className="flex justify-between items-center dark:bg-slate-800 bg-slate-100 shadow py-1 px-2 rounded">
					<p className="dark:text-slate-400">Top positions</p>
					<TopPositions positions={stats.positions} />
				</div>
			</div>
			{/* <pre>{JSON.stringify(stats, null, 2)}</pre> */}
		</section>
	);
}



type PositionsUnion = "TOP" | "JUNGLE" | "MIDDLE" | "BOTTOM" | "UTILITY";

function TopPositions({ positions }: { positions: PositionsUnion[] }) {
	const data = positions.reduce((acc, pos) => {
		acc[pos] = (acc[pos] || 0) + 1;
		return acc;
	}, {} as Record<PositionsUnion, number>);

	return (
		<div className="flex gap-2">
			{Object.entries(data).map(([pos, count]) => (
				<div
					key={pos}
					className="text-sm dark:text-slate-400 flex items-center gap-1"
				>
					<img
						src={`/positions/${pos.toLowerCase()}.png`}
						alt={pos}
						className="size-8"
					/>
					<p>{Math.round((count / positions.length) * 100)}%</p>
				</div>
			))}
		</div>
	);
}

function Heatmap({ timestamps }: { timestamps: number[] }) {
	// heatmap for one week, more matches at day -> lighter color
	const today = new Date();
	const weekLength = 7;

	const weekDateArray = Array.from({ length: weekLength }, (_, i) => {
		const date = new Date(today);
		date.setDate(today.getDate() - i);
		return date;
	});

	const timestampDates = timestamps.map((t) => new Date(t));

	const data = weekDateArray.map((weekDate) => {
		return timestampDates.filter(
			(date) => date.getDate() === weekDate.getDate()
		).length;
	});

	function getHeatmapColor(value: number) {
		if (value === 0) return "dark:bg-slate-700 bg-slate-300";
		if (value < 3) return "bg-cyan-500/40";
		if (value < 6) return "bg-cyan-500/60";
		return "bg-cyan-500";
	}

	return (
		<div className="flex gap-2">
			{data.map((heat) => (
				<div key={heat} className={`size-4 rounded ${getHeatmapColor(heat)}`} />
			))}
		</div>
	);
}
