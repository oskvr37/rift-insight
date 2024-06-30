"use client";

import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function FavoriteButton() {
	const [isFavorite, setIsFavorite] = useState(false);

	return (
		<button
			className="p-1 rounded dark:bg-slate-800 text-cyan-500 size-8"
			onClick={() => {
				setIsFavorite(!isFavorite);
			}}
		>
			{isFavorite ? <StarIconSolid /> : <StarIconOutline />}
		</button>
	);
}
