"use server";

import { SERVERS, SERVERS_NORMALIZED } from "@/types";
import { accountByRiotId, summonerByPuuid } from "@/utils/api";
import { closestRegion } from "@/utils/helpers";
import { redirect } from "next/navigation";

export async function searchUser(
	gameName: string,
	tagLine: string,
	server: SERVERS,
	normalized_server: SERVERS_NORMALIZED
) {
	// TODO ensure `server` is valid
	// TODO ensure `gameName` and `tagLine are valid (regex)

	// validate incoming data
	if (
		typeof gameName !== "string" ||
		typeof tagLine !== "string" ||
		typeof server !== "string"
	) {
		redirect(`/summoner`);
	}

	const region = closestRegion(server);
	const account = await accountByRiotId(gameName, tagLine, region);

	if (!account) redirect(`/summoner`);

	const summoner = await summonerByPuuid(account.puuid, server);

	if (!summoner) {
		// encourage user to try with a different server
		redirect(`/summoner/${normalized_server}`);
	}

	const summoner_url = `${gameName.replace(" ", "+")}-${tagLine}`.toLowerCase();

	redirect(`/summoner/${normalized_server}/${summoner_url}`);
}
