import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { Suspense, cache } from "react";

import { SERVERS_NORMALIZED } from "@/types";

import { accountByRiotId, summonerByPuuid } from "@/utils/api";
import { closestRegion, parseSummoner } from "@/utils/helpers";

import Matches from "@/components/summoner/Matches";
import SummonerLeague from "@/components/summoner/League";
import SummonerMastery from "@/components/summoner/Mastery";
import SummonerProfile from "@/components/summoner/Profile";
import Recently from "@/components/summoner/Recently";
import Summary from "@/components/summoner/Summary";
import FavoriteButton from "@/components/favorite/Button";
import { championSplash } from "@/utils/dragon";

type Props = {
	params: { server: SERVERS_NORMALIZED; summoner: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { riotAccount } = await getSummoner({
		summoner: params.summoner,
		server: params.server,
	});

	return {
		title: `${riotAccount.gameName}#${riotAccount.tagLine} - Summoner Stats & Insights`,
	};
}

export default async function Page({ params }: Props) {
	const { riotServer, riotAccount, region, url } = await getSummoner({
		summoner: params.summoner,
		server: params.server,
	});

	const summonerData = await summonerByPuuid(riotAccount.puuid, riotServer);

	if (!summonerData) {
		redirect(`/summoner/${params.server}`);
	}
	const splash = championSplash(0);

	return (
		<main className="relative">
			<div
				className="absolute top-0 md:top-2 left-0 right-0 w-full -z-10 fadein"
				id="splash"
			>
				<img
					src={splash}
					alt="champion splash"
					className="w-full h-full object-cover dark:opacity-30 md:rounded-2xl"
				/>
				<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t dark:from-slate-900 dark:via-slate-900/75 dark:to-slate-900/25 from-slate-200 to-slate-200/75" />
			</div>
			<div className="my-2 flex gap-2 max-md:py-8">
				<SummonerProfile
					gameName={riotAccount.gameName}
					tagLine={riotAccount.tagLine}
					summonerLevel={summonerData.summonerLevel}
					profileIconId={summonerData.profileIconId}
				/>
				<FavoriteButton
					record={{
						normalized_server: params.server,
						profileIconId: summonerData.profileIconId,
						server: riotServer,
						summonerName: riotAccount.gameName,
						tagLine: riotAccount.tagLine,
						url,
					}}
					className="p-1 size-8 bg-slate-200 dark:bg-slate-800"
				/>
			</div>
			<div className="lg:grid grid-cols-8 gap-8 max-lg:space-y-4 mt-4">
				<div className="space-y-4 col-span-3 w-full">
					<SummonerLeague summoner_id={summonerData.id} server={riotServer} />
					<SummonerMastery puuid={summonerData.puuid} server={riotServer} />
					<Suspense>
						<Summary puuid={summonerData.puuid} region={region} page={1} />
					</Suspense>
					{/* <section>
						<h2>Points graph</h2>
					</section> */}
					<Suspense>
						<Recently
							puuid={summonerData.puuid}
							region={region}
							page={1}
							server={params.server}
						/>
					</Suspense>
				</div>
				<div className="col-span-5">
					<Suspense fallback={<h1 className="animate-pulse">Matches</h1>}>
						<Matches puuid={summonerData.puuid} region={region} />
					</Suspense>
				</div>
			</div>
		</main>
	);
}

const getSummoner = cache(
	async ({
		summoner,
		server,
	}: {
		summoner: string;
		server: SERVERS_NORMALIZED;
	}) => {
		const parsed_summoner = parseSummoner(summoner, server);

		if (!parsed_summoner) {
			notFound();
		}

		const { gameName, tagLine, riotServer, url } = parsed_summoner;
		const region = closestRegion(riotServer);
		const riotAccount = await accountByRiotId(gameName, tagLine, region);

		if (!riotAccount) notFound();

		return { riotServer, riotAccount, region, url };
	}
);
