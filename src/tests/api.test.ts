import { REGIONS, SERVERS } from "@/types";
import {
	summonerByPuuid,
	accountByRiotId,
	matchesByPuuid,
	leagueBySummoner,
	championMasteryByPuuid,
} from "@/utils/api";

describe("Riot API ⚡", () => {
	const GAME_NAME = "KC NEXT ADKING";
	const TAG_LINE = "euw";
	const REGION: REGIONS = "europe";
	const SERVER: SERVERS = "EUW1";

	let puuid = "";
	let summonerId = "";

	test("accountByRiotId", async () => {
		const data = await accountByRiotId(GAME_NAME, TAG_LINE, REGION);
		expect(data.puuid).toBeDefined();
		puuid = data.puuid;
	});

	test("summonerByPuuid", async () => {
		const summoner = await summonerByPuuid(puuid, SERVER);
		expect(summoner).toBeDefined();
		summonerId = summoner.id;

		console.log({ puuid, summonerId });
	});

	// TODO Test query parameters for functions
	// and test the response data

	describe("detailed data", () => {
		test("matchesByPuuid", async () => {
			const matches = await matchesByPuuid(puuid, REGION);
			expect(matches).toBeDefined();
		});

		test("leagueBySummoner", async () => {
			const leagues = await leagueBySummoner(summonerId, SERVER);
			expect(leagues).toBeDefined();
		});

		test("championMasteryByPuuid", async () => {
			const mastery = await championMasteryByPuuid(puuid, SERVER);
			expect(mastery).toBeDefined();
		});
	});
});
