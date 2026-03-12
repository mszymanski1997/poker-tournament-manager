export type GameSettings = {
	startingStack: number;
	buyInValue: number;
	buyIns: number;
	rebuys: number;
	playersIn: number;
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

export type GameSettingsErrors = {
	startingStack?: string;
	buyInValue?: string;
	buyIns?: string;
	playersIn?: string;
	rebuys?: string;
};

export type Currency = 'zł' | '$' | '£' | 'Kč' | '£';

export type PokerContextSettings = {
	settings: GameSettings;
	currency: Currency;
	validateSettings: () => GameSettingsErrors;
	restartPokerSettings: () => void;
	validationErrors: GameSettingsErrors;
	updateOneSetting: (setting: keyof GameSettings, value: number) => void;
	updateCurrency: (currency: Currency) => void;
};
