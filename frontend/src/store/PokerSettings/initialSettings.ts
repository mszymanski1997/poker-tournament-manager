import type { GameSettings } from './types';

export const INITIAL_SETTINGS: GameSettings = {
	startingStack: 0,
	buyInValue: 0,
	buyIns: 0,
	rebuys: 0,
	playersIn: 0,
	rake: {
		enable: false,
		value: 0,
	},
	addons: {
		enable: false,
		value: 0,
		count: 0,
	},
};
