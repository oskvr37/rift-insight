"use client";

import { searchUser } from "@/actions/search";
import { useState } from "react";
import { SERVERS } from "@/types";

export default function SearchBar() {
	const [inputValue, setInputValue] = useState("");
	const [server, setServer] = useState<SERVERS>("EUW1");
	const [error, setError] = useState<string | null>(null);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const split = inputValue.split("#");
		if (split.length !== 2) {
			setError("Invalid summoner name");
			return;
		}

		const summonerName = split[0];
		const tagLine = split[1];

		searchUser(summonerName, tagLine, server);
	}

	return (
		<form onSubmit={handleSubmit} className="flex gap-2">
			<div className="flex rounded bg-slate-800 w-full">
				<select
					className="bg-slate-700 rounded px-2"
					value={server}
					required
					onChange={(event) => setServer(event.target.value as SERVERS)}
				>
					{Object.entries(SERVERS).map(([key, value]) => (
						<option key={key} value={value}>
							{value}
						</option>
					))}
				</select>
				<input
					className="px-2 py-1 w-full"
					required
					type="text"
					placeholder={`name#${server}`}
					// pattern for summoner name#tagline
					pattern="^[a-zA-Z0-9 ]+#[a-zA-Z0-9 ]+$"
					value={inputValue}
					onChange={(event) => setInputValue(event.target.value)}
				/>
			</div>
			<button
				type="submit"
				className="px-2 py-1 rounded bg-cyan-500 text-zinc-900 font-bold"
			>
				Search
			</button>
			{error && <p className="text-red-400">{error}</p>}
		</form>
	);
}
