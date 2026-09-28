import type { SavedTournamentLevel } from '../types';

type CurrencySymbol = 'zł' | '€' | '$' | 'Kč' | '£';

export const formatBuyIn = (
	amount: number,
	currency: string,
	isRake: boolean,
	rake: number,
) => {
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

	if (isRake && rake > 0) {
		const totalBuyInPrice = amount;
		const totalBuyInPriceWithoutRake = Math.round(
			totalBuyInPrice * (1 - rake / 100),
		);

		const rakeAmount = totalBuyInPrice - totalBuyInPriceWithoutRake;

		return `${totalBuyInPriceWithoutRake}${symbol} + ${rakeAmount}${symbol}`;
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
