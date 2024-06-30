import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { Suspense, cache } from "react";

import { SERVERS, SERVERS_NORMALIZED, SERVERS_UNNORMALIZED } from "@/types";

import { accountByRiotId, summonerByPuuid } from "@/utils/api";
import { closestRegion } from "@/utils/helpers";
import { encodeSummoner } from "@/utils/helpers";

import Matches from "@/components/summoner/Matches";
import SummonerLeague from "@/components/summoner/League";
import SummonerMastery from "@/components/summoner/Mastery";
import SummonerProfile from "@/components/summoner/Profile";
import Recently from "@/components/summoner/Recently";

type Props = {
	params: { server: SERVERS_NORMALIZED; summoner: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { gameName, tagLine, riotServer } = await parseParams({ params });
	const { riotAccount } = await getAccount({ gameName, tagLine, riotServer });

	return {
		title: `${riotAccount.gameName}#${riotAccount.tagLine} - Summoner Stats & Insights`,
	};
}

export default async function Page({ params }: Props) {
	const { gameName, tagLine, riotServer } = await parseParams({ params });
	const { riotAccount, region } = await getAccount({
		gameName,
		tagLine,
		riotServer,
	});
	const summonerData = await summonerByPuuid(riotAccount.puuid, riotServer);

	if (!summonerData) {
		redirect(`/summoner/${params.server}`);
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
				{/* <section>
					<h2>Performance overview</h2>
				</section>
				<section>
					<h3>Add to favorites</h3>
				</section> */}
			</div>
			<div className="lg:grid grid-cols-8 gap-8 max-lg:space-y-4">
				<div className="space-y-4 col-span-3 w-full">
					<SummonerLeague summoner_id={summonerData.id} server={riotServer} />
					<SummonerMastery puuid={summonerData.puuid} server={riotServer} />
					<Suspense fallback={<div>Loading...</div>}>
						<Recently puuid={summonerData.puuid} region={region} page={1} />
					</Suspense>
					{/* <section>
						<h2>Points graph</h2>
					</section> */}
				</div>
				<div className="col-span-5">
					<Suspense fallback={<div>Loading...</div>}>
						<Matches puuid={summonerData.puuid} region={region} />
					</Suspense>
				</div>
			</div>
		</main>
	);
}

const parseParams = cache(async ({ params }: Props) => {
	const server = params.server.toUpperCase();
	const summoner = params.summoner;

	if (typeof server !== "string" || typeof summoner !== "string") notFound();
	if (!SERVERS_UNNORMALIZED[server as keyof typeof SERVERS_UNNORMALIZED])
		notFound();

	const split = decodeURIComponent(summoner).split("-");

	if (split.length !== 2) notFound();

	const gameName = encodeSummoner(split[0]);

	const tagLine = split[1].toLowerCase();
	const tagLineRegex = /^[a-z0-9]{3,5}$/;
	if (!tagLineRegex.test(tagLine)) notFound();

	const riotServer = SERVERS_UNNORMALIZED[
		server as keyof typeof SERVERS_UNNORMALIZED
	] as SERVERS;

	// console.log("[Summoner]", { gameName, split, tagLine, riotServer });

	return { gameName, tagLine, riotServer };
});

const getAccount = cache(
	async ({
		gameName,
		tagLine,
		riotServer,
	}: {
		gameName: string;
		tagLine: string;
		riotServer: SERVERS;
	}) => {
		const region = closestRegion(riotServer);
		const riotAccount = await accountByRiotId(gameName, tagLine, region);
		if (!riotAccount) notFound();
		return { riotAccount, region };
	}
);
