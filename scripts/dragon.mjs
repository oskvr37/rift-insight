import { writeFileSync, mkdirSync } from "fs";

const versions = await getVersions();
console.log("⚙️ Latest version:", versions[0]);

const baseUrl = `https://ddragon.leagueoflegends.com/cdn/${versions[0]}`;
console.log("✨ Base URL:", baseUrl);

const { data: champions } = await getChampions(baseUrl);
console.log("🐉 Champions:", Object.keys(champions).length);

if (!existsSync("./src/public")) {
	mkdirSync("./src/public");
}

writeFileSync(
	"./src/public/dragon.json",
	JSON.stringify({ baseUrl, champions })
);
console.log("✅ Config saved in: /src/public/dragon.json");

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

async function getChampions(baseUrl) {
	const request = await fetch(`${baseUrl}/data/en_US/champion.json`);

	if (!request.ok) {
		throw new Error(
			`❌ getChampions (${request.status}) - ${request.statusText}`
		);
	}

	return await request.json();
}
