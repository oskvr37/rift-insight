"use client";

import { searchUser } from "@/actions/search";
import { useEffect, useState } from "react";
import { SERVERS, SERVERS_NORMALIZED } from "@/types";
import useSearchHistory from "@/hooks/search";
import { useLocalStorage } from "@/hooks";
import { useRouter } from "next/navigation";

export default function SearchBar() {
	const { push: redirect } = useRouter();
	const { storeRecentSearch } = useSearchHistory();
	const [storageServer, setStorageServer] = useLocalStorage<SERVERS>(
		"server",
		SERVERS["2"]
	);
	const [pending, setPending] = useState(false);
	const [serverNormalized, setServerNormalized] = useState<SERVERS_NORMALIZED>(
		SERVERS_NORMALIZED[storageServer]
	);
	const [inputValue, setInputValue] = useState("");
	const [error, setError] = useState<string | null>(null);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		setPending(true);
		event.preventDefault();

		searchUser(inputValue, serverNormalized)
			.then((response) => {
				if (!response) {
					setError("User not found");
					return;
				}
				storeRecentSearch(response);
				setInputValue("");
				redirect(`/summoner/${response.normalized_server}/${response.url}`);
			})
			.finally(() => setPending(false));
	}

	useEffect(() => {
		setServerNormalized(SERVERS_NORMALIZED[storageServer]);
	}, [storageServer]);

	return (
		<section className="space-y-1">
			{error && <p className="text-red-400 text-sm">{error}</p>}
			<form onSubmit={handleSubmit} className="flex gap-2 fadein">
				<div className="flex rounded dark:bg-slate-800 border-slate-300 dark:border-transparent border w-full">
					<select
						className="dark:bg-slate-700 bg-slate-200/25 rounded-l px-2"
						value={storageServer}
						required
						onChange={(event) => {
							setStorageServer(event.target.value as SERVERS);
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
						// 🐛 make pattern work for non latin names
						pattern="^[a-zA-Z0-9 ]{3,16}#[a-zA-Z0-9 ]{3,5}$"
						value={inputValue}
						onChange={(event) => setInputValue(event.target.value)}
					/>
				</div>
				<button
					disabled={pending}
					type="submit"
					className="px-2 py-1 rounded bg-cyan-500 text-zinc-900 font-bold disabled:animate-pulse"
				>
					Search
				</button>
			</form>
		</section>
	);
}
