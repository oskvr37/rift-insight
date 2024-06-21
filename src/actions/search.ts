"use server";

import { SERVERS, SERVERS_NORMALIZED } from "@/types";
import { accountByRiotId, summonerByPuuid } from "@/utils/api";
import { closestRegion } from "@/utils/helpers";
import { redirect } from "next/navigation";
import { encodeSummoner } from "@/utils/helpers";

export async function searchUser(
	gameName: string,
	tagLine: string,
	server: SERVERS,
	normalized_server: SERVERS_NORMALIZED
) {
	// validate incoming data
	if (
		typeof gameName !== "string" ||
		typeof tagLine !== "string" ||
		typeof server !== "string"
	) {
		return;
	}

	// ensure `server` is valid
	if (!SERVERS.includes(server)) {
		return;
	}

	// ensure `gameName` and `tagLine are valid
	const riotIdRegex = /^[a-zA-Z0-9 ]{3,16}$/;
	const tagLineRegex = /^[a-zA-Z0-9]{3,5}$/;

	if (!riotIdRegex.test(gameName) || !tagLineRegex.test(tagLine)) {
		return;
	}

	const region = closestRegion(server);
	const account = await accountByRiotId(gameName, tagLine, region);

	if (!account) redirect(`/summoner`);

	const summoner = await summonerByPuuid(account.puuid, server);

	if (!summoner) {
		// encourage user to try with a different server
		redirect(`/summoner/${normalized_server}`);
	}

	const encodedSummoner = encodeSummoner(account.gameName);

	redirect(
		`/summoner/${normalized_server}/${encodedSummoner}-${account.tagLine}`
	);
}
