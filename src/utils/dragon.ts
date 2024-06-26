import dragon from "@/utils/dragon.json";

const { baseUrl, champions } = dragon;

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
