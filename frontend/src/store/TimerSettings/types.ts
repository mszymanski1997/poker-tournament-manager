export type BlindLevel = {
	type: 'blind';
	duration: number;
	bigBlind: number;
	smallBlind: number;
	ante: number;
};

export type BreakLevel = {
	type: 'break';
	duration: number;
};

export type Level = BlindLevel | BreakLevel;

export type TimerContextValue = {
	levels: Level[];
	currentIndex: number;
	isRunning: boolean;
	currentLevel: Level;
	isFirstLevel: boolean;
	isLastLevel: boolean;
	nextLevel: () => void;
	previousLevel: () => void;
	startTimer: () => void;
	stopTimer: () => void;
	updateLevels: (levels: Level[]) => void;
};
