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
	timeLeft: number;
	nextLevel: () => void;
	previousLevel: () => void;
};
