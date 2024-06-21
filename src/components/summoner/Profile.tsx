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
	const profile_icon = await profileIcon(profileIconId);

	return (
		<section>
			<h1>
				{gameName} <span className="text-sm">{tagLine}</span>
			</h1>
			<p>{summonerLevel} lvl</p>
			<img src={profile_icon} alt="profile icon" />
		</section>
	);
}
