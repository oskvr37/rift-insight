import { accountByRiotId, summonerByPuuid } from "@/utils/api";
import { SERVERS, SERVERS_NORMALIZED, SERVERS_UNNORMALIZED } from "@/types";
import { closestRegion } from "@/utils/helpers";
import { notFound, redirect } from "next/navigation";
import { encodeSummoner } from "@/utils/helpers";

export default async function Page({
	params,
}: {
	params: { server: SERVERS_NORMALIZED; summoner: string };
}) {
	const server = params.server.toUpperCase();
	const summoner = params.summoner;
	// validate params
	if (typeof server !== "string" || typeof summoner !== "string") notFound();
	// check if server is valid
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

	console.log({ gameName, split, tagLine, riotServer });

	const region = closestRegion(riotServer);
	const riotAccount = await accountByRiotId(gameName, tagLine, region);

	if (!riotAccount) notFound();

	// check if server is valid
	const summonerData = await summonerByPuuid(riotAccount.puuid, riotServer);

	if (!summonerData) {
		redirect(`/summoner/${server}`);
	}

	return (
		<main>
			<section>
				<h1>
					{riotAccount.gameName} #{riotAccount.tagLine}
				</h1>
				<p>{summonerData.summonerLevel} lvl</p>
			</section>
		</main>
	);
}
