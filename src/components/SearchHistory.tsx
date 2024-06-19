"use client";

import useSearchHistory from "@/hooks/search";
import useFavorites from "@/hooks/favorites";

export default function SearchHistory() {
	const { searchHistory, clearSearchHistory, deleteSearchRecord } =
		useSearchHistory();

	const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

	return (
		<div className="fadein space-y-2">
			<section>
				<h2 className="text-lg font-semibold">Search History</h2>
				<div>
					{Array.from(searchHistory.values() || []).map(([key, record]) => (
						<div key={key}>
							<span>
								{record.summonerName}#{record.tagLine}
							</span>
							<span className="text-xs text-gray-400">
								{" "}
								- {record.normalized_server}
							</span>
							<span
								onClick={() => deleteSearchRecord(key)}
								className="text-red-400"
							>
								❌
							</span>
							<span
								className={`${!isFavorite(record) && "grayscale"}`}
								onClick={() => {
									if (isFavorite(record)) {
										removeFavorite(record);
									} else {
										addFavorite(record);
									}
								}}
							>
								⭐
							</span>
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
			<section>
				<h2>Favorites</h2>
				<div>
					{Object.values(favorites).map((record) => (
						<div key={record.summonerName + record.tagLine}>
							<span>
								{record.summonerName}#{record.tagLine}
							</span>
							<span className="text-xs text-gray-400">
								{" "}
								- {record.normalized_server}
							</span>
							<span onClick={() => removeFavorite(record)}>⭐</span>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
