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
import FavoriteButton from "@/components/favorite/Button";

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

	return (
		<main className="space-y-4	">
			<div className="flex gap-2">
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
					className="p-1 size-8"
				/>

				{/* <section>
					<h2>Performance overview</h2>
				</section>
				*/}
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
