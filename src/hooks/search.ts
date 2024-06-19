import { SERVERS, SERVERS_NORMALIZED } from "@/types";
import { useLocalStorage } from ".";

type SearchRecord = {
	server: SERVERS;
	normalized_server: SERVERS_NORMALIZED;
	summonerName: string;
	tagLine: string;
};

export function useSearchHistory(): {
	searchHistory: Array<[string, SearchRecord]>;
	storeRecentSearch: (record: SearchRecord) => void;
	clearSearchHistory: () => void;
	deleteSearchRecord: (key: string) => void;
} {
	const [searchHistory, setSearch] = useLocalStorage("searchHistory", []);

	function storeRecentSearch(record: SearchRecord) {
		const LIMIT = 10;

		const current_map = new Map(searchHistory);

		// remove the oldest search if we reach the limit
		if (current_map.size >= LIMIT) {
			current_map.delete(current_map.keys().next().value);
		}

		const key = `${record.summonerName.toLowerCase()}#${record.tagLine.toLowerCase()}`;

		// move the key to the end of the map
		if (current_map.has(key)) {
			current_map.delete(key);
		}

		const new_map = new Map(current_map.set(key, record));

		setSearch(Array.from(new_map));
	}

	function clearSearchHistory() {
		setSearch([]);
	}

	function deleteSearchRecord(key: string) {
		const current_map = new Map(searchHistory);
		current_map.delete(key);
		setSearch(Array.from(current_map));
	}

	return {
		searchHistory,
		storeRecentSearch,
		clearSearchHistory,
		deleteSearchRecord,
	};
}
