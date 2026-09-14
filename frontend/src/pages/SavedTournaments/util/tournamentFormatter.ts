import type { SavedTournamentLevel } from '../types';

type CurrencySymbol = 'zł' | '€' | '$' | 'Kč' | '£';

export const formatBuyIn = (amount: number, currency: string) => {
	let symbol: CurrencySymbol = 'zł';

	if (currency === 'PLN') {
		symbol = 'zł';
	} else if (currency === 'EUR') {
		symbol = '€';
	} else if (currency === 'USD') {
		symbol = '$';
	} else if (currency === 'CZK') {
		symbol = 'Kč';
	} else if (currency === 'GBP') {
		symbol = '£';
	}

	return `${amount}${symbol}`;
};

export const formatStartingStack = (
	startingStack: number,
	levels: SavedTournamentLevel[],
) => {
	const firstLevelWithBB = levels.find((lvl) => lvl.bigBlind);

	if (!firstLevelWithBB || !firstLevelWithBB.bigBlind) {
		return `${startingStack.toLocaleString()}`;
	}

	const bigBlindsCount = Math.round(startingStack / firstLevelWithBB.bigBlind);

	return `${bigBlindsCount}bb`;
};

export const formatLevelsDuration = (levels: SavedTournamentLevel[]) => {
	const levelDurations = levels.map((lvl) => lvl.duration);

	const sortedDurations = levelDurations.sort((a, b) => a - b);

	const firstDuration = sortedDurations[0];

	const lastDuration = sortedDurations[sortedDurations.length - 1];

	let durationDescription;

	if (firstDuration === lastDuration) {
		durationDescription = `${firstDuration}m`;
	} else {
		durationDescription = `${firstDuration}/${lastDuration}m`;
	}

	return durationDescription;
};
