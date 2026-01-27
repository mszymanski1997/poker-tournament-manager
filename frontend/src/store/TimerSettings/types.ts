export type BlindLevel = {
	type: 'blind';
	id: string;
	duration: number;
	bigBlind: number;
	smallBlind: number;
	ante: number;
};

export type blindInputValue = {
	duration: number;
	bigBlind: number;
	smallBlind: number;
	ante: number;
};

export type BreakLevel = {
	type: 'break';
	id: string;
	duration: number;
};

export type Level = BlindLevel | BreakLevel;

export type LevelField = 'duration' | 'bigBlind' | 'smallBlind' | 'ante';

export type LevelErrors = {
	[levelId: string]: Partial<Record<LevelField, string>>;
};

export type LevelLocalStorageData = {
	levelIndex: number;
	timeLeft: number;
};

export type TimerContextValue = {
	levels: Level[];
	currentIndex: number;
	isRunning: boolean;

	currentBlindIndex: number;
	currentLevel: Level;
	upcomingLevel: Level | undefined;
	totalTournamentDuration: number;

	isFirstLevel: boolean;
	isLastLevel: boolean;
	isTournamentFinished: boolean;
	isWarningMessageVisible: boolean;
	isFormModalOpen: boolean;

	finishTournament: () => void;
	resumeTournament: () => void;
	restartTournament: () => void;
	loadLastSettings: () => void;

	closeFormModal: () => void;
	openFormModal: () => void;

	nextLevel: () => void;
	previousLevel: () => void;

	startTimer: () => void;
	stopTimer: () => void;

	updateBlindLevel: (id: string, key: keyof BlindLevel, value: number) => void;
	updateBreakLevel: (id: string, value: number) => void;

	addNewLevel: (level: 'break' | 'blind') => void;
	removeLevel: (id: string) => void;

	getBlindValue: (key: keyof blindInputValue, id: string) => number | undefined;
	getBreakValue: (id: string) => number | undefined;

	levelsErrors: LevelErrors;
	updateLevelsErrors: (errors: LevelErrors) => void;

	timeLeft: number;
};
