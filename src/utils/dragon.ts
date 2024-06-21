// ⚡ most of these functions should be memoized and not async
// we can use react cache for that

async function getVersions(): Promise<string[]> {
	const request = await fetch(
		"https://ddragon.leagueoflegends.com/api/versions.json",
		{
			next: {
				revalidate: 86400,
			},
		}
	);

	if (!request.ok) {
		throw new Error(
			`Failed to getLatestVersion (${request.status}) - ${request.statusText}`
		);
	}

	return await request.json();
}

async function getChampions() {
	const versions = await getVersions();
	const request = await fetch(
		`https://ddragon.leagueoflegends.com/cdn/${versions[0]}/data/en_US/champion.json`,
		{
			next: {
				revalidate: 86400,
			},
		}
	);

	if (!request.ok) {
		throw new Error(
			`Failed to getChampions (${request.status}) - ${request.statusText}`
		);
	}

	return await request.json();
}

export async function profileIcon(id: number) {
	const versions = await getVersions();
	return `https://ddragon.leagueoflegends.com/cdn/${versions[0]}/img/profileicon/${id}.png`;
}

export async function championIcon(id: number) {
	const versions = await getVersions();
	const champions = await getChampions();

	const champion = Object.values(champions.data).find(
		// @ts-ignore
		(champion) => champion.key === String(id)
	);

	// 💡 we can also return the champion
	// and use it in the component

	// @ts-ignore
	return `https://ddragon.leagueoflegends.com/cdn/${versions[0]}/img/champion/${champion.image.full}`;
}
