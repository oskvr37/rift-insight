import { REGIONS } from "@/types";
import { FormattedMatch } from "@/app/api/summoner/[puuid]/match/[match_id]/route";
import { matchesByPuuid } from "@/utils/api";
import { cache } from "react";
import { championIcon } from "@/utils/dragon";

type GatheredMatch = FormattedMatch & {
	won: boolean;
	player: FormattedMatch["players"][0];
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
					matches.push({
						...match,
						player: match.players.find((p) => p.info.puuid === puuid)!,
						won: match.players.find((p) => p.info.puuid === puuid)!.team.win,
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

	return (
		<article
			key={match.match_id}
			className={`rounded p-2 space-y-2 ${
				match.won
					? "dark:bg-cyan-900 bg-cyan-400/25"
					: "dark:bg-slate-800 bg-slate-100"
			}`}
		>
			<div className="flex gap-2 text-xs dark:text-slate-300">
				<span>
					{new Date(match.created_at).toLocaleString("en-US", {
						month: "2-digit",
						day: "2-digit",
						year: "2-digit",
					})}
				</span>
				<span>{duration}</span>
			</div>
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
				{/* insights */}
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
			<div className="flex gap-2">
				{match.players.map((player) => (
					<div key={player.champion.id} className="flex gap-2">
						<div>
							<img className="size-8" src={championIcon(player.champion.id)} />
						</div>
					</div>
				))}
			</div>
		</article>
	);
}
