export type GameSettings = {
	startingStack: number;
	buyInValue: number;
	buyIns: number;
	rebuys: number;
	playersIn: number;
	rake: {
		enable: boolean;
		value: number;
	};
	addons: {
		enable: boolean;
		value: number;
		count: number;
	};
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
	handleEnableRake: () => void;
	handleDisableRake: () => void;
	handleEnableAddons: () => void;
	handleDisableAddons: () => void;
	validateSettings: () => GameSettingsErrors;
	restartPokerSettings: () => void;
	validationErrors: GameSettingsErrors;
	updateOneSetting: (
		setting: Exclude<keyof GameSettings, 'rake' | 'addons'>,
		value: number,
	) => void;
	updateNestedSetting: <
		K extends 'rake' | 'addons',
		F extends keyof GameSettings[K],
	>(
		key: K,
		field: F,
		value: GameSettings[K][F],
	) => void;
	updateCurrency: (currency: Currency) => void;
};
