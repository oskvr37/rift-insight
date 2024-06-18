"use server";

import { SERVERS } from "@/types";
import { accountByRiotId } from "@/utils/api";
import { closestRegion } from "@/utils/helpers";
import { redirect } from "next/navigation";

export async function searchUser(
	gameName: string,
	tagLine: string,
	server: SERVERS
) {
	// validate incoming data
	// TODO ensure server is valid
	if (
		typeof gameName !== "string" ||
		typeof tagLine !== "string" ||
		typeof server !== "string"
	) {
		redirect(`/summoner`);
	}

	// first we check if the account exists
	// if it does, we redirect to the account page

	const region = closestRegion(server);

	const account = await accountByRiotId(gameName, tagLine, region);

	if (account) {
		redirect(`/summoner/${server}/${account.gameName}-${account.tagLine}`);
	}

	// account does not exist or there was an error

	redirect(`/summoner`);
}
