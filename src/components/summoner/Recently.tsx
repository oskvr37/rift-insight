import { REGIONS } from "@/types";
import { gatherMatches } from "./Matches";

export default async function Recently({
  puuid,
  region,
  page
}: {
  puuid: string;
  region: REGIONS;
  page: number;

}) {
  const matches = await gatherMatches(puuid, region, page);

  const playedWith: Record<string, any> = {};
  matches.map((m) =>
    m.participants.filter((p) => p.puuid !== puuid).map((p) => {
      if (playedWith[p.puuid]) {
        playedWith[p.puuid].games += 1;
        playedWith[p.puuid].win += p.win ? 1 : 0;
      } else {
        playedWith[p.puuid] = { ...p, games: 1, win: p.win ? 1 : 0 };
      }
    })
  );
  
  const data = Object.values(playedWith).filter((p) => p.games > 1);

  return (
    <section>
      <h2>Recently played with</h2>
      <div className="space-y-2">
        {data.map((p) => (
          <div key={p.summonerName} className="dark:bg-slate-800 bg-slate-300 p-2 rounded">
            <span className="font-bold">{p.summonerName}</span>
            {" #"}
            {p.riotIdTagline}
            <p>Games: {p.games}</p>
            <p>Winrate: {100 * (p.win / p.games)}%</p>
          </div>
        ))}
      </div>
    </section>
  )
}