interface Metadata {
	dataVersion: string;
	matchId: string;
	participants: string[];
}

interface Challenges {
	"12AssistStreakCount": number;
	InfernalScalePickup: number;
	abilityUses: number;
	acesBefore15Minutes: number;
	alliedJungleMonsterKills: number;
	baronTakedowns: number;
	blastConeOppositeOpponentCount: number;
	bountyGold: number;
	buffsStolen: number;
	completeSupportQuestInTime: number;
	controlWardsPlaced: number;
	damagePerMinute: number;
	damageTakenOnTeamPercentage: number;
	dancedWithRiftHerald: number;
	deathsByEnemyChamps: number;
	dodgeSkillShotsSmallWindow: number;
	doubleAces: number;
	dragonTakedowns: number;
	earliestDragonTakedown: number;
	earlyLaningPhaseGoldExpAdvantage: number;
	effectiveHealAndShielding: number;
	elderDragonKillsWithOpposingSoul: number;
	elderDragonMultikills: number;
	enemyChampionImmobilizations: number;
	enemyJungleMonsterKills: number;
	epicMonsterKillsNearEnemyJungler: number;
	epicMonsterKillsWithin30SecondsOfSpawn: number;
	epicMonsterSteals: number;
	epicMonsterStolenWithoutSmite: number;
	firstTurretKilled: number;
	fistBumpParticipation: number;
	flawlessAces: number;
	fullTeamTakedown: number;
	gameLength: number;
	getTakedownsInAllLanesEarlyJungleAsLaner: number;
	goldPerMinute: number;
	hadOpenNexus: number;
	immobilizeAndKillWithAlly: number;
	initialBuffCount: number;
	initialCrabCount: number;
	jungleCsBefore10Minutes: number;
	junglerTakedownsNearDamagedEpicMonster: number;
	kTurretsDestroyedBeforePlatesFall: number;
	kda: number;
	killAfterHiddenWithAlly: number;
	killParticipation: number;
	killedChampTookFullTeamDamageSurvived: number;
	killingSprees: number;
	killsNearEnemyTurret: number;
	killsOnOtherLanesEarlyJungleAsLaner: number;
	killsOnRecentlyHealedByAramPack: number;
	killsUnderOwnTurret: number;
	killsWithHelpFromEpicMonster: number;
	knockEnemyIntoTeamAndKill: number;
	landSkillShotsEarlyGame: number;
	laneMinionsFirst10Minutes: number;
	laningPhaseGoldExpAdvantage: number;
	legendaryCount: number;
	legendaryItemUsed: number[];
	lostAnInhibitor: number;
	maxCsAdvantageOnLaneOpponent: number;
	maxKillDeficit: number;
	maxLevelLeadLaneOpponent: number;
	mejaisFullStackInTime: number;
	moreEnemyJungleThanOpponent: number;
	multiKillOneSpell: number;
	multiTurretRiftHeraldCount: number;
	multikills: number;
	multikillsAfterAggressiveFlash: number;
	outerTurretExecutesBefore10Minutes: number;
	outnumberedKills: number;
	outnumberedNexusKill: number;
	perfectDragonSoulsTaken: number;
	perfectGame: number;
	pickKillWithAlly: number;
	playedChampSelectPosition: number;
	poroExplosions: number;
	quickCleanse: number;
	quickFirstTurret: number;
	quickSoloKills: number;
	riftHeraldTakedowns: number;
	saveAllyFromDeath: number;
	scuttleCrabKills: number;
	skillshotsDodged: number;
	skillshotsHit: number;
	snowballsHit: number;
	soloBaronKills: number;
	soloKills: number;
	stealthWardsPlaced: number;
	survivedSingleDigitHpCount: number;
	survivedThreeImmobilizesInFight: number;
	takedownOnFirstTurret: number;
	takedowns: number;
	takedownsAfterGainingLevelAdvantage: number;
	takedownsBeforeJungleMinionSpawn: number;
	takedownsFirstXMinutes: number;
	takedownsInAlcove: number;
	takedownsInEnemyFountain: number;
	teamBaronKills: number;
	teamDamagePercentage: number;
	teamElderDragonKills: number;
	teamRiftHeraldKills: number;
	tookLargeDamageSurvived: number;
	turretPlatesTaken: number;
	turretTakedowns: number;
	turretsTakenWithRiftHerald: number;
	twentyMinionsIn3SecondsCount: number;
	twoWardsOneSweeperCount: number;
	unseenRecalls: number;
	visionScoreAdvantageLaneOpponent: number;
	visionScorePerMinute: number;
	voidMonsterKill: number;
	wardTakedowns: number;
	wardTakedownsBefore20M: number;
	wardsGuarded: number;
}

interface PerkSelection {
	perk: number;
	var1: number;
	var2: number;
	var3: number;
}

interface PerkStyle {
	description: string;
	selections: PerkSelection[];
	style: number;
}

interface Perks {
	statPerks: {
		defense: number;
		flex: number;
		offense: number;
	};
	styles: PerkStyle[];
}

interface Missions {
	playerScore0: number;
	playerScore1: number;
	playerScore2: number;
	playerScore3: number;
	playerScore4: number;
	playerScore5: number;
	playerScore6: number;
	playerScore7: number;
	playerScore8: number;
	playerScore9: number;
	playerScore10: number;
	playerScore11: number;
}

interface Participant {
	allInPings: number;
	assistMePings: number;
	assists: number;
	baronKills: number;
	basicPings: number;
	bountyLevel: number;
	challenges: Challenges;
	champExperience: number;
	champLevel: number;
	championId: number;
	championName: string;
	championTransform: number;
	commandPings: number;
	consumablesPurchased: number;
	damageDealtToBuildings: number;
	damageDealtToObjectives: number;
	damageDealtToTurrets: number;
	damageSelfMitigated: number;
	dangerPings: number;
	deaths: number;
	detectorWardsPlaced: number;
	doubleKills: number;
	dragonKills: number;
	eligibleForProgression: boolean;
	enemyMissingPings: number;
	enemyVisionPings: number;
	firstBloodAssist: boolean;
	firstBloodKill: boolean;
	firstTowerAssist: boolean;
	firstTowerKill: boolean;
	gameEndedInEarlySurrender: boolean;
	gameEndedInSurrender: boolean;
	getBackPings: number;
	goldEarned: number;
	goldSpent: number;
	holdPings: number;
	individualPosition: string;
	inhibitorKills: number;
	inhibitorTakedowns: number;
	inhibitorsLost: number;
	item0: number;
	item1: number;
	item2: number;
	item3: number;
	item4: number;
	item5: number;
	item6: number;
	itemsPurchased: number;
	killingSprees: number;
	kills: number;
	lane: string;
	largestCriticalStrike: number;
	largestKillingSpree: number;
	largestMultiKill: number;
	longestTimeSpentLiving: number;
	magicDamageDealt: number;
	magicDamageDealtToChampions: number;
	magicDamageTaken: number;
	missions: Missions;
	needVisionPings: number;
	neutralMinionsKilled: number;
	nexusKills: number;
	nexusLost: number;
	nexusTakedowns: number;
	objectivesStolen: number;
	objectivesStolenAssists: number;
	onMyWayPings: number;
	participantId: number;
	pentaKills: number;
	perks: Perks;
	physicalDamageDealt: number;
	physicalDamageDealtToChampions: number;
	physicalDamageTaken: number;
	placement: number;
	playerAugment1: number;
	playerAugment2: number;
	playerAugment3: number;
	playerAugment4: number;
	playerAugment5: number;
	playerAugment6: number;
	playerSubteamId: number;
	profileIcon: number;
	pushPings: number;
	puuid: string;
	quadraKills: number;
	riotIdGameName: string;
	riotIdTagline: string;
	role: string;
	sightWardsBoughtInGame: number;
	spell1Casts: number;
	spell2Casts: number;
	spell3Casts: number;
	spell4Casts: number;
	subteamPlacement: number;
	summoner1Casts: number;
	summoner1Id: number;
	summoner2Casts: number;
	summoner2Id: number;
	summonerId: string;
	summonerLevel: number;
	summonerName: string;
	summonerSpells: {
		spell1Id: number;
		spell2Id: number;
	};
	summonerSpellsPurchased: number;
	surrendered: boolean;
	teamEarlySurrendered: boolean;
	teamId: number;
	teamPosition: string;
	timeCCingOthers: number;
	timePlayed: number;
	totalDamageDealt: number;
	totalDamageDealtToChampions: number;
	totalDamageShieldedOnTeammates: number;
	totalDamageTaken: number;
	totalHeal: number;
	totalHealsOnTeammates: number;
	totalMinionsKilled: number;
	totalTimeCCingOthers: number;
	totalTimeSpentDead: number;
	totalTimeSpentDeadPenalty: number;
	tripleKills: number;
	trueDamageDealt: number;
	trueDamageDealtToChampions: number;
	trueDamageTaken: number;
	turretKills: number;
	turretTakedowns: number;
	turretsLost: number;
	unrealKills: number;
	visionScore: number;
	visionWardsBoughtInGame: number;
	wardsKilled: number;
	wardsPlaced: number;
	win: boolean;
	winForFeedback: boolean;
	winner: boolean;
}

interface Info {
	difficulty: number;
	id: string;
	name: string;
	title: string;
}

interface Champion {
	attributes: string[];
	id: number;
	info: Info;
	name: string;
	roles: string[];
}

interface Team {
	bans: {
		championId: number;
		pickTurn: number;
	}[];
	objectives: {
		baron: {
			first: boolean;
			kills: number;
		};
		champion: {
			dragon: number;
			inhibitor: number;
			riftHerald: number;
			tower: number;
		};
		dragon: {
			first: boolean;
			kills: number;
		};
		inhibitor: {
			first: boolean;
			kills: number;
		};
		riftHerald: {
			first: boolean;
			kills: number;
		};
		tower: {
			first: boolean;
			kills: number;
		};
	};
	teamId: number;
	win: boolean;
}

interface TeamStats {
	teamId: number;
	win: boolean;
	players: Participant[];
	bans: number[];
	objectives: {
		baron: {
			first: boolean;
			kills: number;
		};
		champion: {
			dragon: number;
			inhibitor: number;
			riftHerald: number;
			tower: number;
		};
		dragon: {
			first: boolean;
			kills: number;
		};
		inhibitor: {
			first: boolean;
			kills: number;
		};
		riftHerald: {
			first: boolean;
			kills: number;
		};
		tower: {
			first: boolean;
			kills: number;
		};
	};
}

export interface GameData {
	metadata: Metadata;
	info: {
		gameCreation: number;
		gameDuration: number;
		gameId: number;
		gameMode: string;
		gameName: string;
		gameStartTimestamp: number;
		gameType: string;
		gameVersion: string;
		mapId: number;
		participants: Participant[];
		platformId: string;
		queueId: number;
		teams: Team[];
		champions: Champion[];
		teamStats: TeamStats[];
	};
}
