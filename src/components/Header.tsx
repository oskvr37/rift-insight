"use client";

import Link from "next/link";
import {
	StarIcon as StarIconSolid,
	MagnifyingGlassIcon,
} from "@heroicons/react/16/solid";
import icon from "@/app/icon.svg";
import List from "@/components/favorite/List";
import SearchHistory from "@/components/SearchHistory";
import SearchBar from "@/components/SearchBar";

import { useState, useCallback } from "react";

export default function Header() {
	const [currentModal, setCurrentModal] = useState("");

	const openModal = useCallback((modal: string) => {
		setCurrentModal((prevModal) => (prevModal !== modal ? modal : ""));
	}, []);

	function renderModal() {
		switch (currentModal) {
			case "favorite":
				return (
						<List key="List" />
				);
			case "search-history":
				return (
					<section
						className="md:grid gap-2 flex flex-col-reverse md:grid-cols-2"
						key="SearchHistory"
					>
						<SearchHistory />
						<SearchBar />
					</section>
				);
			default:
				return null;
		}
	}

	return (
		<header className="z-50">
			<div className="container flex items-center justify-between">
				<Link href="/" className="flex gap-1">
					<img src={icon.src} alt="Rift Insight" className="size-6" />
					<div className="dark:text-slate-300">
						Rift <span className="text-cyan-500">Insight</span>
					</div>
				</Link>
				<section className="flex gap-2">
					<button
						className="dark:bg-slate-800 p-2 rounded shadow"
						onClick={() => openModal("search-history")}
					>
						<MagnifyingGlassIcon className="size-6 text-cyan-500" />
					</button>
					<button
						className="dark:bg-slate-800 p-2 rounded shadow"
						onClick={() => openModal("favorite")}
					>
						<StarIconSolid className="size-6 text-cyan-500" />
					</button>
				</section>
			</div>
			{currentModal && (
				<aside className="container border-b-2 border-slate-800">
					{currentModal && renderModal()}
				</aside>
			)}
		</header>
	);
}
