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
		if (favorites[getKey(record)]) return;

		setFavorites({ ...favorites, [getKey(record)]: record });
	}

	function removeFavorite(record: SearchRecord) {
		if (!favorites[getKey(record)]) return;

		const new_favorites = { ...favorites };
		delete new_favorites[getKey(record)];

		setFavorites(new_favorites);
	}

	function isFavorite(record: SearchRecord) {
		return !!favorites[getKey(record)];
	}

	return { favorites, addFavorite, removeFavorite, isFavorite };
}

function getKey(record: SearchRecord) {
	return `${record.normalized_server}/${record.url}`;
}