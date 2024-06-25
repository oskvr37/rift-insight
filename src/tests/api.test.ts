import { REGIONS, SERVERS } from "@/types";
import {
	summonerByPuuid,
	accountByRiotId,
	matchesByPuuid,
	matchById,
	leagueBySummoner,
	championMasteryByPuuid,
} from "@/utils/api";

describe("Riot API", () => {
	const GAME_NAME = "KC NEXT ADKING";
	const TAG_LINE = "euw";
	const REGION: REGIONS = "europe";
	const SERVER: SERVERS = "EUW1";

	let puuid = "";
	let summonerId = "";
	let matches = [] as string[];

	describe("accountByRiotId", () => {
		test("returns data", async () => {
			const data = await accountByRiotId(GAME_NAME, TAG_LINE, REGION);
			expect(data.puuid).toBeDefined();
			puuid = data.puuid;
		});

		test("returns null if not found", async () => {
			const data = await accountByRiotId("invalid", "invalid", REGION);
			expect(data).toBeNull();
		});

		test("returns data when using + instead of space", async () => {
			const data = await accountByRiotId("KC+NEXT+ADKING", TAG_LINE, REGION);
			expect(data).toBeDefined();
		});
	});

	test("summonerByPuuid", async () => {
		const summoner = await summonerByPuuid(puuid, SERVER);
		expect(summoner).toBeDefined();
		summonerId = summoner.id;

		console.log({ puuid, summonerId });
	});

	// ✅ test query parameters for functions
	// and test the response data

	describe("detailed data", () => {
		test("leagueBySummoner", async () => {
			const leagues = await leagueBySummoner(summonerId, SERVER);
			expect(leagues).toBeDefined();
		});

		test("championMasteryByPuuid", async () => {
			const mastery = await championMasteryByPuuid(puuid, SERVER);
			expect(mastery).toBeDefined();
		});
	});

	describe("matches", () => {
		test("matchesByPuuid", async () => {
			matches = await matchesByPuuid(puuid, REGION);
			expect(matches).toBeDefined();
		});

		test("matchById", async () => {
			const match = await matchById(matches[0], REGION);
			expect(match).toBeDefined();
		});
	});
});
