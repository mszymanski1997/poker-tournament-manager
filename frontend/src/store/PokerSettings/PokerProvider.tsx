import { PokerContext } from './PokerContext';
import { type GameSettings } from './types';
import { useEffect, useState, type ReactNode } from 'react';

export const PokerProvider = ({ children }: { children: ReactNode }) => {
	const [settings, setSettings] = useState<GameSettings>({
		startingStack: 2500,
		buyInValue: 0,
		buyIns: 0,
		rebuys: 0,
		playersIn: 0,
		averageStack: '-',
		totalChips: '-',
		totalMoney: '-',
	});

	useEffect(() => {
		console.log(settings);
	}, [settings]);

	const setStartingStack = (stack: number) => {
		setSettings((prev) => ({ ...prev, startingStack: stack }));
	};

	const setBuyInValue = (value: number) => {
		setSettings((prev) => ({ ...prev, buyInValue: value }));
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

	return (
		<PokerContext.Provider
			value={{
				settings,
				setStartingStack,
				setBuyInValue,
				setBuyInsCount,
				setRebuysCount,
				setPlayersInCount,
			}}
		>
			{children}
		</PokerContext.Provider>
	);
};
