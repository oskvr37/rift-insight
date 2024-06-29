import { writeFileSync, existsSync } from "fs";

const versions = await getVersions();
console.log("⚙️ Latest version:", versions[0]);

const baseUrl = `https://ddragon.leagueoflegends.com/cdn/${versions[0]}`;
console.log("✨ Base URL:", baseUrl);

const { data: champions } = await fetchDragon(
	baseUrl,
	"data/en_US/champion.json"
);
console.log("🐉 Champions:", Object.keys(champions).length);

const { data: summoners } = await fetchDragon(
	baseUrl,
	"data/en_US/summoner.json"
);
console.log("🔮 Summoner:", Object.keys(summoners).length);

if (!existsSync("./src/utils")) {
	mkdirSync("./src/public");
}

writeFileSync(
	"./src/utils/dragon.json",
	JSON.stringify({ baseUrl, champions, summoners })
);
console.log("✅ Config saved in: /src/utils/dragon.json");

async function getVersions() {
	const request = await fetch(
		"https://ddragon.leagueoflegends.com/api/versions.json"
	);

	if (!request.ok) {
		throw new Error(
			`❌ getVersions (${request.status}) - ${request.statusText}`
		);
	}

	return await request.json();
}

async function fetchDragon(baseUrl, endpoint) {
	const url = `${baseUrl}/${endpoint}`;
	console.log("🔗 Fetch", url);
	const request = await fetch(url);

	if (!request.ok) {
		throw new Error(
			`❌ fetch ${endpoint} (${request.status}) - ${request.statusText}`
		);
	}

	return await request.json();
}
