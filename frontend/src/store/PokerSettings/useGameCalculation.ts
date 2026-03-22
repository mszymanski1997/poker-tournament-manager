import { usePokerSettings } from './usePokerSettings';
import { type PayoutsSettings } from './types';

export const useGameCalculation = () => {
	const { settings } = usePokerSettings();
	const { buyInValue, buyIns, rebuys, playersIn, startingStack, addons, rake } =
		settings;

	const totalEntries = buyIns + rebuys;

	const totalAddonsValue = addons.enable ? addons.value * addons.count : 0;

	const totalChips = startingStack * totalEntries + totalAddonsValue;

	const averageStack = playersIn ? Math.floor(totalChips / playersIn) : '-';

	const countTotalMoney = () => {
		const totalMoney = buyInValue * totalEntries;

		if (!buyIns) return '-';

		if (rake.enable && rake.value > 0) {
			return Math.round(totalMoney * (1 - rake.value / 100));
		}

		return totalMoney;
	};

	const totalMoney = countTotalMoney();

	const setPayouts = (): PayoutsSettings => {
		if (typeof totalMoney === 'number') {
			if (buyIns > 0 && buyIns <= 5) {
				return totalMoney;
			} else if (buyIns > 5 && buyIns <= 10) {
				return {
					first: Math.round(totalMoney * 0.7),
					second: Math.round(totalMoney * 0.3),
				};
			} else if (buyIns > 10 && buyIns <= 20) {
				return {
					first: Math.round(totalMoney * 0.6),
					second: Math.round(totalMoney * 0.25),
					third: Math.round(totalMoney * 0.15),
				};
			} else if (settings.buyIns > 20) {
				return {
					first: Math.round(totalMoney * 0.45),
					second: Math.round(totalMoney * 0.27),
					third: Math.round(totalMoney * 0.18),
					fourth: Math.round(totalMoney * 0.1),
				};
			}
		}

		return 'Add players';
	};

	return {
		totalChips,
		averageStack,
		totalMoney,
		setPayouts,
	};
};
