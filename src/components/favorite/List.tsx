"use client";

import useFavorites from "@/hooks/favorites";
import Link from "next/link";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { SearchRecord } from "@/types";

export default function FavoriteList() {
	const { favorites, addFavorite, isFavorite, removeFavorite } = useFavorites();

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
			<h2>Favorites</h2>
			{!Object.keys(favorites).length && (
				<p className="dark:text-slate-400 text-slate-600 fadein">
					No favorites yet!
				</p>
			)}
			<ol className="fadein space-y-2">
				{Object.values(favorites).map((record) => (
					<li
						key={record.summonerName + record.tagLine}
						className="flex items-center gap-2"
					>
						<FavoriteButton record={record} />
						<Link
							href={`/summoner/${record.normalized_server}/${record.url}`}
							className="dark:text-slate-200"
						>
							{record.summonerName}#{record.tagLine}
							<span className="text-xs dark:text-slate-400">
								{" "}
								{record.normalized_server}
							</span>
						</Link>
					</li>
				))}
			</ol>
		</section>
	);
}
