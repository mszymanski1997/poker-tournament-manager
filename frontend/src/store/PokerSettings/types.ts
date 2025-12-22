export type GameSettings = {
	// basic input data
	startingStack: number;
	buyInValue: number;
	buyIns: number;
	rebuys: number;
	playersIn: number;

	// calculated data
	averageStack: number | '-';
	totalChips: number | '-';
	totalMoney: number | '-';
};

export type PayoutsSettings =
	| number
	| {
			first: number;
			second: number;
			third?: number;
			fourth?: number;
	  }
	| 'Add players';

export type PokerContextSettings = {
	settings: GameSettings;
	setStartingStack: (count: number) => void;
	setBuyInValue: (value: number) => void;
	setBuyInsCount: (count: number) => void;
	setRebuysCount: (count: number) => void;
	setPlayersInCount: (count: number) => void;
	setPayouts: () => PayoutsSettings;
};
