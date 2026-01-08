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

export type TimerContextValue = {
	levels: Level[];
	currentIndex: number;
	isRunning: boolean;

	currentBlindIndex: number;
	currentLevel: Level;
	upcomingLevel: Level | undefined;

	isFirstLevel: boolean;
	isLastLevel: boolean;
	isTournamentFinished: boolean;
	isWarningMessageVisible: boolean;

	finishTournament: () => void;
	resumeTournament: () => void;
	restartTournament: () => void;

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
};
