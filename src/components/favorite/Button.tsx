"use client";

import { SearchRecord } from "@/types";
import useFavorites from "@/hooks/favorites";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";

export default function FavoriteButton({
	record,
	className,
}: {
	record: SearchRecord;
	className?: string;
}) {
	const { addFavorite, removeFavorite, isFavorite } = useFavorites();

	return (
		<button
			className={`rounded dark:bg-slate-800 text-cyan-400 shadow ${className}`}
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
