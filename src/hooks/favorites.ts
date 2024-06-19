import { SearchRecord } from "@/types";
import { useLocalStorage } from ".";

export default function useFavorites(): {
	favorites: string[];
	addFavorite: (record: SearchRecord) => void;
	removeFavorite: (record: SearchRecord) => void;
	isFavorite: (record: SearchRecord) => boolean;
} {
	const [favorites, setFavorites] = useLocalStorage(
		"favorites",
		[] as string[]
	);

	function addFavorite(record: SearchRecord) {
		const key = `${record.summonerName.toLowerCase()}#${record.tagLine.toLowerCase()}`;

		if (favorites.includes(key)) {
			return;
		}

		setFavorites([...favorites, key]);
	}

	function removeFavorite(record: SearchRecord) {
		const key = `${record.summonerName.toLowerCase()}#${record.tagLine.toLowerCase()}`;

		setFavorites(favorites.filter((favorite: string) => favorite !== key));
	}

	function isFavorite(record: SearchRecord) {
		const key = `${record.summonerName.toLowerCase()}#${record.tagLine.toLowerCase()}`;

		return favorites.includes(key);
	}

	return { favorites, addFavorite, removeFavorite, isFavorite };
}
