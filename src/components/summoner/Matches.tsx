import { REGIONS } from "@/types";
import { FormattedMatch } from "@/utils/helpers";
import { matchesByPuuid } from "@/utils/api";
import { cache } from "react";
import { championIcon, itemIcon, spellIcon } from "@/utils/dragon";

type GatheredMatch = FormattedMatch & {
	player: FormattedMatch["players"][0];
	player_team: FormattedMatch["players"];
	enemy_team: FormattedMatch["players"];
};

export const gatherMatches = cache(
	async (puuid: string, region: REGIONS, page: number) => {
		const LIMIT = 10;

		const matchIds = await matchesByPuuid(puuid, region, {
			count: LIMIT,
			start: LIMIT * (page - 1),
			type: "ranked",
		});
		const baseUrl =
			process.env.NODE_ENV === "production"
				? "https://rift-insight.vercel.app"
				: "http://localhost:3000";

		const matches: GatheredMatch[] = [];

		// ⚡ we would use `Promise.all` here to fetch all matches at once
		// but we are rate limited by not having a production API key

		for (const matchId of matchIds) {
			await fetch(`${baseUrl}/api/summoner/${region}/${puuid}/match/${matchId}`, {
				cache: "force-cache",
			})
				.then((res) => res.json())
				.then((match: FormattedMatch) => {
					const player = match.players.find((p) => p.info.puuid === puuid)!;
					const player_team = match.players.filter(
						(p) => p.team.win === player.team.win
					);
					const enemy_team = match.players.filter(
						(p) => p.team.win !== player.team.win
					);

					matches.push({
						...match,
						player,
						player_team,
						enemy_team,
					});
				});
		}

		return matches;
	}
);

export default async function SummonerMatches({
	puuid,
	region,
}: {
	puuid: string;
	region: REGIONS;
}) {
	const matches = await gatherMatches(puuid, region, 1);

	return (
		<section className="space-y-2">
			<div>
				<h1>Matches</h1>
				{/* ✨ add quick summary */}
				{/* <div>Winrate, KDA, etc.</div> */}
			</div>
			<div className="space-y-4">
				{matches.map((match) => (
					<Match key={match.match_id} match={match} />
				))}
			</div>
		</section>
	);
}

function Match({ match }: { match: GatheredMatch }) {
	const duration = `${Math.floor(match.duration / 60)}:${(match.duration % 60)
		.toString()
		.padStart(2, "0")}`;

	// 💡 add role/position icon `match.player.champion.role`

	const playerTeamKills = match.player_team.reduce(
		(acc, player) => acc + player.stats.kills,
		0
	);

	const playerKillParticipation = Math.round(
		((match.player.stats.kills + match.player.stats.assists) /
			playerTeamKills) *
			100
	);

	const playerKDA =
		(match.player.stats.kills + match.player.stats.assists) /
		match.player.stats.deaths;

	function Summary() {
		return (
			<div>
				<p>
					{match.player.stats.visionScore} vision |{" "}
					{match.player.stats.totalMinionsKilled} CS |{" "}
					{match.player.stats.neutralMinionsKilled} jungle
				</p>
				<p>
					Physical {match.player.damage.physical} / Magic{" "}
					{match.player.damage.magic} / True {match.player.damage.true}
				</p>
				<p>
					Runes {match.player.runes.primary} {match.player.runes.secondary}
				</p>
				<div className="flex gap-2">
					{match.player.insights.firstBlood && <p>First blood</p>}
					{match.player.insights.killingSpree > 0 && (
						<p> {match.player.insights.killingSpree} killing spree</p>
					)}
					{match.player.insights.multikill > 0 && (
						<p>{match.player.insights.multikill} multikill</p>
					)}
				</div>
				<div className="flex gap-1 items-center">
					{match.player_team.map((player) => (
						<img
							key={player.champion.id}
							src={championIcon(player.champion.id)}
							alt=""
							className="size-5"
						/>
					))}
					<div />
					{match.enemy_team.map((player) => (
						<img
							key={player.champion.id}
							src={championIcon(player.champion.id)}
							alt=""
							className="size-5"
						/>
					))}
				</div>
			</div>
		);
	}

	function Header() {
		return (
			<section
				className={`flex gap-2 text-xs dark:font-light dark:text-slate-300 justify-between p-2 rounded-t shadow ${
					match.player.team.win
						? "dark:bg-cyan-900 bg-cyan-500"
						: "dark:bg-slate-700 bg-slate-300"
				}`}
			>
				<div className="flex gap-2">
					<span>{match.player.team.win ? "Victory" : "Defeat"}</span>
					<span>&#8226;</span>
					<span>{duration}</span>
				</div>
				<span>
					{new Date(match.created_at).toLocaleString("en-US", {
						month: "2-digit",
						day: "2-digit",
						year: "2-digit",
					})}
				</span>
			</section>
		);
	}

	function Items() {
		const items = match.player.items.slice(0, 6).sort((a, b) => b - a);
		items.push(match.player.items[6]);

		return (
			<div className="flex gap-1">
				{items.map((item) => (
					<Item key={item} item={item} />
				))}
			</div>
		);
	}

	return (
		<article
			key={match.match_id}
			className={`rounded dark:bg-slate-800 bg-slate-100 shadow`}
		>
			<Header />
			<section className="space-y-2 p-2">
				<div className="grid md:grid-cols-2 gap-2 items-center">
					<div className="flex gap-2 items-center">
						<img
							src={championIcon(match.player.champion.id)}
							alt={match.player.champion.name}
							className="size-12"
						/>
						<div className="flex gap-4">
							<div>
								<p>
									{match.player.champion.name} {match.player.champion.level} lvl
								</p>
								<p>
									{match.player.stats.kills} / {match.player.stats.deaths} /{" "}
									{match.player.stats.assists}
								</p>
							</div>
							<div>
								<p>{playerKillParticipation}% KP</p>
								<p>{playerKDA.toFixed(2)} KDA</p>
							</div>
						</div>
					</div>
					<div className="flex gap-1">
						<img
							src={spellIcon(match.player.summoners.spell1)}
							alt=""
							className="size-6"
						/>
						<img
							src={spellIcon(match.player.summoners.spell2)}
							alt=""
							className="size-6"
						/>
						<Items />
					</div>
				</div>
			</section>
			{/* <Summary /> */}
		</article>
	);
}

function Item({ item }: { item: number }) {
	if (item === 0)
		return <div className="size-6 dark:bg-slate-700  rounded shadow" />;
	return <img src={itemIcon(item)} alt="" className="size-6 rounded" />;
}
