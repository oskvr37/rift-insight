import { REGIONS } from "@/types";
import { FormattedMatch } from "@/app/api/summoner/[puuid]/match/[match_id]/route";
import { matchesByPuuid } from "@/utils/api";
import { cache } from "react";
import { championIcon } from "@/utils/dragon";

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
			await fetch(`${baseUrl}/api/summoner/${puuid}/match/${matchId}`, {
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
			<div className="space-y-2">
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

	function Summary() {
		return (
			<div>
				<p>
					{match.player.champion.name} {match.player.champion.level} lvl |{" "}
					{match.player.champion.role}
				</p>
				<p>
					{match.player.stats.kills} / {match.player.stats.deaths} /{" "}
					{match.player.stats.assists}
				</p>
				<p>
					{match.player.stats.visionScore} vision |{" "}
					{match.player.stats.totalMinionsKilled} CS |{" "}
					{match.player.stats.neutralMinionsKilled} jungle
				</p>
				<p>
					Spells {match.player.summoners.spell1} {match.player.summoners.spell2}
				</p>
				<p>
					Physical {match.player.damage.physical} / Magic{" "}
					{match.player.damage.magic} / True {match.player.damage.true}
				</p>
				<p>
					Runes {match.player.runes.primary} {match.player.runes.secondary}
				</p>
				<p>Items {match.player.items.join(" ")}</p>
				<div className="flex gap-2">
					{match.player.insights.firstBlood && <p>First blood</p>}
					{match.player.insights.killingSpree > 0 && (
						<p> {match.player.insights.killingSpree} killing spree</p>
					)}
					{match.player.insights.multikill > 0 && (
						<p>{match.player.insights.multikill} multikill</p>
					)}
				</div>
			</div>
		);
	}

	return (
		<article
			key={match.match_id}
			className={`rounded p-2 space-y-2 ${
				match.player.team.win
					? "dark:bg-cyan-900 bg-cyan-400/25"
					: "dark:bg-slate-800 bg-slate-100"
			}`}
		>
			<section className="flex gap-2 text-xs dark:font-light dark:text-slate-300 justify-between">
				<div className="flex gap-2">
					<span>{match.player.team.win ? "Victory" : "Defeat"}</span>
					<span>&#8226;</span>
					<span>{duration}</span>
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
				<span>
					{new Date(match.created_at).toLocaleString("en-US", {
						month: "2-digit",
						day: "2-digit",
						year: "2-digit",
					})}
				</span>
			</section>
			<section className="flex gap-2 items-center">
				<img
					src={championIcon(match.player.champion.id)}
					alt={match.player.champion.name}
					className="size-12"
				/>
			</section>
		</article>
	);
}
