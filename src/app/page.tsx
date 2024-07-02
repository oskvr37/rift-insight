import SearchBar from "@/components/SearchBar";
import SearchHistory from "@/components/SearchHistory";
import FavoriteList from "@/components/favorite/List";

export default async function Page() {
	return (
		<main className="space-y-8">
			<section className="space-y-4">
				<h1 className="text-2xl">Check out your stats and insights!</h1>
				<p className="max-w-96">
					Welcome to{" "}
					<span className="text-cyan-500 font-bold">Rift Insight!</span> You can
					check out your League of Legends progress and learn more about your
					playstyle.
				</p>
			</section>
			<section className="md:w-1/2">
				<SearchBar />
			</section>
			<SearchHistory />
			<FavoriteList />
		</main>
	);
}
