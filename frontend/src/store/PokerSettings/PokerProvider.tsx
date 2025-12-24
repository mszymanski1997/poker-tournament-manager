import { PokerContext } from './PokerContext';
import { type GameSettings, type PayoutsSettings } from './types';
import { useState, type ReactNode } from 'react';

export const PokerProvider = ({ children }: { children: ReactNode }) => {
	const [settings, setSettings] = useState<GameSettings>({
		startingStack: 0,
		buyInValue: 0,
		buyIns: 0,
		rebuys: 0,
		playersIn: 0,
		averageStack: '-',
		totalChips: '-',
		totalMoney: '-',
	});

	const setStartingStack = (stack: number) => {
		setSettings((prev) => {
			const newTotalChips = (prev.buyIns + prev.rebuys) * stack;
			const newAverageStack = Math.floor(newTotalChips / prev.playersIn);

			return {
				...prev,
				startingStack: stack,
				totalChips: newTotalChips,
				averageStack: newAverageStack,
			};
		});
	};

	const setBuyInValue = (value: number) => {
		setSettings((prev) => ({
			...prev,
			buyInValue: value,
			totalMoney: (prev.buyIns + prev.rebuys) * value,
		}));
	};

	const setBuyInsCount = (count: number) => {
		setSettings((prev) => {
			const newTotalChips = (count + prev.rebuys) * prev.startingStack;
			const newAverageStack = Math.floor(newTotalChips / prev.playersIn);
			const newTotalMoney = (count + prev.rebuys) * prev.buyInValue;

			return {
				...prev,
				buyIns: count,
				totalChips: newTotalChips,
				averageStack: newAverageStack,
				totalMoney: newTotalMoney,
			};
		});
	};

	const setRebuysCount = (count: number) => {
		setSettings((prev) => {
			const newTotalChips = (prev.buyIns + count) * prev.startingStack;
			const newAverageStack = Math.floor(newTotalChips / prev.playersIn);
			const newTotalMoney = (prev.buyIns + count) * prev.buyInValue;

			return {
				...prev,
				rebuys: count,
				totalChips: newTotalChips,
				averageStack: newAverageStack,
				totalMoney: newTotalMoney,
			};
		});
	};

	const setPlayersInCount = (count: number) => {
		setSettings((prev) => {
			const newAverageStack = Math.floor(+prev.totalChips / count);

			return {
				...prev,
				playersIn: count,
				averageStack: newAverageStack,
			};
		});
	};

	const setPayouts = (): PayoutsSettings => {
		if (settings.buyIns > 0 && settings.buyIns <= 5) {
			return +settings.totalMoney;
		} else if (settings.buyIns > 5 && settings.buyIns <= 10) {
			return {
				first: Math.round(+settings.totalMoney * 0.7),
				second: Math.round(+settings.totalMoney * 0.3),
			};
		} else if (settings.buyIns > 10 && settings.buyIns <= 20) {
			return {
				first: Math.round(+settings.totalMoney * 0.6),
				second: Math.round(+settings.totalMoney * 0.25),
				third: Math.round(+settings.totalMoney * 0.15),
			};
		} else if (settings.buyIns > 20) {
			return {
				first: Math.round(+settings.totalMoney * 0.45),
				second: Math.round(+settings.totalMoney * 0.27),
				third: Math.round(+settings.totalMoney * 0.18),
				fourth: Math.round(+settings.totalMoney * 0.1),
			};
		} else return 'Add players';
	};

	return (
		<PokerContext.Provider
			value={{
				settings,
				setStartingStack,
				setBuyInValue,
				setBuyInsCount,
				setRebuysCount,
				setPlayersInCount,
				setPayouts,
			}}
		>
			{children}
		</PokerContext.Provider>
	);
};
