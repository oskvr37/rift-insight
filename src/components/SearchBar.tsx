"use client";

import { searchUser } from "@/actions/search";
import { useEffect, useState } from "react";
import { SERVERS, SERVERS_NORMALIZED } from "@/types";
import useSearchHistory from "@/hooks/search";
import { useLocalStorage } from "@/hooks";

export default function SearchBar() {
	const { storeRecentSearch } = useSearchHistory();
	const [storageServer, setStorageServer] = useLocalStorage<SERVERS>(
		"server",
		SERVERS["2"]
	);

	const [server, setServer] = useState<SERVERS>(storageServer);
	const [serverNormalized, setServerNormalized] = useState<SERVERS_NORMALIZED>(
		SERVERS_NORMALIZED[storageServer]
	);
	const [inputValue, setInputValue] = useState("");
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

		searchUser(summonerName, tagLine, server, serverNormalized).then(() => {
			storeRecentSearch({
				server,
				normalized_server: serverNormalized,
				summonerName,
				tagLine,
			});
		});
	}

	useEffect(() => {
		setServerNormalized(SERVERS_NORMALIZED[server]);
		setStorageServer(server);
	}, [server, setStorageServer]);

	return (
		<section>
			{error && <p className="text-red-400 text-sm">{error}</p>}
			<form onSubmit={handleSubmit} className="flex gap-2 fadein">
				<div className="flex rounded bg-slate-800 w-full">
					<select
						className="bg-slate-700 rounded px-2"
						value={server}
						required
						onChange={(event) => {
							setServer(event.target.value as SERVERS);
						}}
					>
						{Object.entries(SERVERS_NORMALIZED).map(([key, value]) => (
							<option key={key} value={key}>
								{value}
							</option>
						))}
					</select>
					<input
						className="px-2 py-1 w-full"
						required
						type="text"
						placeholder={`name#${serverNormalized}`}
						// TODO tagline max length is 5
						// TODO figure out max length for summoner name
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
			</form>
		</section>
	);
}
