import { profileIcon } from "@/utils/dragon";

export default async function SummonerProfile({
	gameName,
	tagLine,
	summonerLevel,
	profileIconId,
}: {
	gameName: string;
	tagLine: string;
	summonerLevel: number;
	profileIconId: number;
}) {
	const profile_icon = profileIcon(profileIconId);

	return (
		<section className="flex gap-4">
			<img src={profile_icon} alt="profile icon" className="size-32 rounded-xl" />
			<div>

			<h1>
				{gameName} <span className="text-sm">#{tagLine}</span>
			</h1>
			<p>{summonerLevel} lvl</p>
			</div>
		</section>
	);
}
