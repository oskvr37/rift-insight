import { REGIONS } from "@/types";
import { matchesByPuuid } from "@/utils/api";

export default async function SummonerMatches({
	puuid,
	region,
}: {
	puuid: string;
	region: REGIONS;
}) {
	const matches = await matchesByPuuid(puuid, region);

	return (
		<section>
			<h1>Matches</h1>
			{matches.map((m) => (
				<div key={m}>{m}</div>
			))}
		</section>
	);
}
