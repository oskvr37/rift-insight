import { SERVERS, REGIONS } from "@/types";

export function queryToString(query: Record<string, any>) {
	return Object.entries(query)
		.map(([key, value]) => `${key}=${value}`)
		.join("&");
}

export function closestRegion(server: SERVERS) {
	// find closest region to server
	if (
		server === "BR1" ||
		server === "LA1" ||
		server === "LA2" ||
		server === "NA1"
	) {
		return "americas";
	} else if (
		server === "EUN1" ||
		server === "EUW1" ||
		server === "RU" ||
		server === "TR1"
	) {
		return "europe";
	}
	return "asia";
}
