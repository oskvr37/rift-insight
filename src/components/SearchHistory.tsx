"use client";

import useSearchHistory from "@/hooks/search";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { SearchRecord } from "@/types";
import useFavorites from "@/hooks/favorites";

export default function SearchHistory() {
	const { searchHistory, clearSearchHistory, deleteSearchRecord } =
		useSearchHistory();
	const { addFavorite, isFavorite, removeFavorite } = useFavorites();

	const entries = Array.from(searchHistory.values() || []);
	function FavoriteButton({ record }: { record: SearchRecord }) {
		return (
			<button
				className={`rounded dark:bg-slate-800 text-cyan-400 shadow p-1 size-6`}
				onClick={() => {
					if (isFavorite(record)) {
						removeFavorite(record);
					} else {
						addFavorite(record);
					}
				}}
			>
				{isFavorite(record) ? <StarIconSolid /> : <StarIconOutline />}
			</button>
		);
	}
	return (
		<section className="space-y-2">
			<h2>Search History</h2>
			{entries.length === 0 && (
				<p className="dark:text-slate-400 text-slate-600 fadein">
					Search for summoners!
				</p>
			)}
			<ol className="fadein space-y-2">
				{entries.map(([key, record]) => (
					<li key={key} className="flex items-center gap-2">
						<FavoriteButton record={record} />
						<button
							onClick={() => deleteSearchRecord(key)}
							className="dark:bg-slate-800 text-red-400 rounded p-1 shadow"
						>
							<XMarkIcon className="size-4" />
						</button>
						<Link href={`/summoner/${record.normalized_server}/${record.url}`}>
							{record.summonerName}#{record.tagLine}
							<span className="text-xs dark:text-slate-400">
								{" "}
								{record.normalized_server}
							</span>
						</Link>
					</li>
				))}
			</ol>
			{entries.length !== 0 && (
				<button
					onClick={clearSearchHistory}
					className="dark:bg-slate-800 text-red-400 hover:text-red-500 px-2 py-1 rounded text-xs shadow"
				>
					Clear Search History
				</button>
			)}
		</section>
	);
}
