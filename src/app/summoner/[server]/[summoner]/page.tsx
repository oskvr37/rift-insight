import { notFound, redirect } from "next/navigation";

import { SERVERS, SERVERS_NORMALIZED, SERVERS_UNNORMALIZED } from "@/types";

import { accountByRiotId, summonerByPuuid } from "@/utils/api";
import { closestRegion } from "@/utils/helpers";
import { encodeSummoner } from "@/utils/helpers";

import Matches from "@/components/summoner/Matches";
import SummonerLeague from "@/components/summoner/League";
import SummonerMastery from "@/components/summoner/Mastery";
import SummonerProfile from "@/components/summoner/Profile";
import Recently from "@/components/summoner/Recently";
import { Suspense } from "react";

export default async function Page({
	params,
}: {
	params: { server: SERVERS_NORMALIZED; summoner: string };
}) {
	const server = params.server.toUpperCase();
	const summoner = params.summoner;

	if (typeof server !== "string" || typeof summoner !== "string") notFound();
	if (!SERVERS_UNNORMALIZED[server as keyof typeof SERVERS_UNNORMALIZED])
		notFound();

	const split = decodeURIComponent(summoner).split("-");

	if (split.length !== 2) notFound();

	const gameName = encodeSummoner(split[0]);

	const tagLineRegex = /^[a-z0-9]{3,5}$/;
	const tagLine = split[1].toLowerCase();
	if (!tagLineRegex.test(tagLine)) notFound();

	const riotServer = SERVERS_UNNORMALIZED[
		server as keyof typeof SERVERS_UNNORMALIZED
	] as SERVERS;

	// console.log("[Summoner]", { gameName, split, tagLine, riotServer });

	const region = closestRegion(riotServer);
	const riotAccount = await accountByRiotId(gameName, tagLine, region);

	if (!riotAccount) notFound();

	const summonerData = await summonerByPuuid(riotAccount.puuid, riotServer);

	if (!summonerData) {
		redirect(`/summoner/${server}`);
	}

	return (
		<main className="space-y-4">
			<div className="flex justify-between">
				<SummonerProfile
					gameName={riotAccount.gameName}
					tagLine={riotAccount.tagLine}
					summonerLevel={summonerData.summonerLevel}
					profileIconId={summonerData.profileIconId}
				/>
				<section>
					<h2>Performance overview</h2>
				</section>
				<section>
					<h3>Add to favorites</h3>
				</section>
			</div>
			<div className="grid md:grid-cols-3 gap-4">
				<div className="space-y-4">
					<SummonerLeague summoner_id={summonerData.id} server={riotServer} />
					<SummonerMastery puuid={summonerData.puuid} server={riotServer} />
					<Suspense fallback={<div>Loading...</div>}>
						<Recently puuid={summonerData.puuid} region={region} page={1} />
					</Suspense>
					<section>
						<h2>Points graph</h2>
					</section>
				</div>
				<div className="col-span-2">
					<Suspense fallback={<div>Loading...</div>}>
						<Matches puuid={summonerData.puuid} region={region} />
					</Suspense>
				</div>
			</div>
		</main>
	);
}
