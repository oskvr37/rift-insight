export const REGIONS = ["americas", "asia", "europe", "esports"] as const;
export const SERVERS = [
	"BR1",
	"EUN1",
	"EUW1",
	"JP1",
	"KR",
	"LA1",
	"LA2",
	"NA1",
	"OC1",
	"PH2",
	"RU",
	"SG2",
	"TH2",
	"TR1",
	"TW2",
	"VN2",
] as const;

export type REGIONS = typeof REGIONS[number];
export type SERVERS = typeof SERVERS[number];
