"use server";

// 💡 make server action return gameName and tagLine
// so we can store formatted data in the store.
// but lets wait for `useActionState` to be released

import { SERVERS_NORMALIZED } from "@/types";
import { accountByRiotId, summonerByPuuid } from "@/utils/api";
import { closestRegion, encodeSummoner } from "@/utils/helpers";
import { parseSummoner } from "@/utils/helpers";

export async function searchUser(
	name: string,
	normalized_server: SERVERS_NORMALIZED
) {
	const { gameName, tagLine, riotServer } = parseSummoner(
		name.replace("#", "-"),
		normalized_server
	);

	const region = closestRegion(riotServer);
	const account = await accountByRiotId(gameName, tagLine, region);

	if (!account) return null;

	const summoner = await summonerByPuuid(account.puuid, riotServer);

	if (!summoner) return null;

	// use `encodeURIComponent` to fix the issue with special characters
	// in redirect header
	// const encodedSummoner = encodeURIComponent(account.gameName);

	return {
		server: riotServer,
		normalized_server,
		summonerName: account.gameName,
		tagLine: account.tagLine,
		url: `${encodeSummoner(account.gameName)}-${account.tagLine.toLowerCase()}`,
		profileIconId: summoner.profileIconId,
	};
}
