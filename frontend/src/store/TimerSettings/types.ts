export type BlindLevel = {
	type: 'blind';
	id: string;
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
	currentLevel: Level;
	upcomingLevel: Level | undefined;
	isFirstLevel: boolean;
	isLastLevel: boolean;
	nextLevel: () => void;
	previousLevel: () => void;
	startTimer: () => void;
	stopTimer: () => void;
	updateLevels: (levels: Level[]) => void;
	addNewLevel: (level: 'break' | 'blind') => void;
	removeLevel: (id: string) => void;
};
