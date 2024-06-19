import { SearchRecord } from "@/types";
import { useLocalStorage } from ".";

export default function useFavorites(): {
	favorites: Record<string, SearchRecord>;
	addFavorite: (record: SearchRecord) => void;
	removeFavorite: (record: SearchRecord) => void;
	isFavorite: (record: SearchRecord) => boolean;
} {
	const [favorites, setFavorites] = useLocalStorage<
		Record<string, SearchRecord>
	>("favorites", {});

	function addFavorite(record: SearchRecord) {
		const key = `${record.summonerName.toLowerCase()}#${record.tagLine.toLowerCase()}`;

		if (favorites[key]) return;

		setFavorites({ ...favorites, [key]: record });
	}

	function removeFavorite(record: SearchRecord) {
		const key = `${record.summonerName.toLowerCase()}#${record.tagLine.toLowerCase()}`;

		if (!favorites[key]) return;

		const new_favorites = { ...favorites };
		delete new_favorites[key];

		setFavorites(new_favorites);
	}

	function isFavorite(record: SearchRecord) {
		const key = `${record.summonerName.toLowerCase()}#${record.tagLine.toLowerCase()}`;

		return !!favorites[key];
	}

	return { favorites, addFavorite, removeFavorite, isFavorite };
}
