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

export type REGIONS = (typeof REGIONS)[number];
export type SERVERS = (typeof SERVERS)[number];

export const SERVERS_UNNORMALIZED = {
	BR: "BR1",
	EUW: "EUW1",
	EUNE: "EUN1",
	JP: "JP1",
	KR: "KR",
	LAN: "LA1",
	LAS: "LA2",
	NA: "NA1",
	OCE: "OC1",
	TR: "TR1",
	RU: "RU",
	SG: "SG",
	VN: "VN",
	TW: "TW",
	TH: "TH",
	PH: "PH",
};

export const SERVERS_NORMALIZED = {
	BR1: "BR",
	EUW1: "EUW",
	EUN1: "EUNE",
	JP1: "JP",
	KR: "KR",
	LA1: "LAN",
	LA2: "LAS",
	NA1: "NA",
	OC1: "OCE",
	TR1: "TR",
	RU: "RU",
	SG2: "SG",
	VN2: "VN",
	TW2: "TW",
	TH2: "TH",
	PH2: "PH",
};

export type SERVERS_NORMALIZED =
	(typeof SERVERS_NORMALIZED)[keyof typeof SERVERS_NORMALIZED];
export type SERVERS_UNNORMALIZED =
	(typeof SERVERS_UNNORMALIZED)[keyof typeof SERVERS_UNNORMALIZED];

export type SearchRecord = {
	server: SERVERS;
	normalized_server: SERVERS_NORMALIZED;
	summonerName: string;
	tagLine: string;
	url: string;
	profileIconId: number;
};

