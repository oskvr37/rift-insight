import dragon from "@/utils/dragon.json";

const { baseUrl, champions, summoners } = dragon;

export function profileIcon(id: number) {
	return `${baseUrl}/img/profileicon/${id}.png`;
}

export function championIcon(id: number) {
	const champion = Object.values(champions).find(
		(champion) => champion.key === String(id)
	);

	// 💡 we can also return the champion
	// and use it in the component to show more info

	// 🚨 we assume champion is found by using `champion!`

	return `${baseUrl}/img/champion/${champion!.image.full}`;
}

export function itemIcon(id: number) {
	return `${baseUrl}/img/item/${id}.png`;
}

export function spellIcon(id: number) {
	const spell = Object.values(summoners).find(
		(summoner) => summoner.key === String(id)
	);

	return `${baseUrl}/img/spell/${spell!.image.full}`;
}