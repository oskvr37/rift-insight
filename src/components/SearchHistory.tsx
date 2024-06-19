"use client";

import { useSearchHistory } from "@/hooks/search";

export default function SearchHistory() {
	const {
		searchHistory,
		clearSearchHistory,
		deleteSearchRecord,
	} = useSearchHistory();

	return (
		<section className="fadein space-y-2">
			<h2 className="text-lg font-semibold">Search History</h2>
			<div>
				{Array.from(searchHistory.values() || []).map(
					([key, { summonerName, tagLine, normalized_server }]) => (
						<div key={key}>
							<span>
								{summonerName}#{tagLine}
							</span>
							<span className="text-xs text-gray-400">
								{" "}
								- {normalized_server}
							</span>
							<span onClick={() => deleteSearchRecord(key)}>
								<span className="text-red-400"> X</span>
							</span>
						</div>
					)
				)}
			</div>
			<button
				onClick={clearSearchHistory}
				className="text-red-400 hover:text-red-500 px-2 py-1 rounded text-sm"
			>
				Clear Search History
			</button>
		</section>
	);
}
