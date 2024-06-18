"use client";

import { getStorageHistory } from "./SearchBar";

export default function SearchHistory() {
	const history = getStorageHistory();

	return (
		<section className="fadein space-y-2">
			<h2 className="text-lg font-semibold">Search History</h2>
			<div>
				{Object.values(history).map((search) => (
					<div key={search.summonerName}>
						<p>
							{search.normalized_server} {search.summonerName}#{search.tagLine}
						</p>
					</div>
				))}
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

function clearSearchHistory() {
	localStorage.removeItem("history");
}
