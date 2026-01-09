import { PokerContext } from './PokerContext';
import {
	type GameSettings,
	type GameSettingsErrors,
	type PayoutsSettings,
} from './types';
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

	const [validationErrors, setValidationErrors] = useState<GameSettingsErrors>(
		{}
	);

	const validateSettings = () => {
		setValidationErrors({});
		const newErrors: GameSettingsErrors = {};

		if (settings.startingStack <= 0) {
			newErrors.startingStack = 'Starting stack must be greater than 0';
		}

		if (settings.buyInValue <= 0) {
			newErrors.buyInValue = 'Buy-in value must be greater than 0';
		}

		if (settings.buyIns <= 1) {
			newErrors.buyIns = 'Minimum 2 players required';
		}

		if (settings.playersIn <= 1) {
			newErrors.playersIn = 'Minimum 2 players required';
		}

		if (settings.playersIn > settings.buyIns + settings.rebuys) {
			newErrors.playersIn =
				'Players in cannot exceed the total number of buy-ins and rebuys.';
		}

		setValidationErrors(newErrors);
		return newErrors;
	};

	const updateValidationErrors = (
		value: number,
		field: keyof GameSettingsErrors
	) => {
		if (value > 0) {
			setValidationErrors((prev) => {
				if (!prev[field]) return prev;
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { [field]: _, ...rest } = prev;
				return rest;
			});
		}
	};

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

		updateValidationErrors(stack, 'startingStack');
	};

	const setBuyInValue = (value: number) => {
		setSettings((prev) => ({
			...prev,
			buyInValue: value,
			totalMoney: (prev.buyIns + prev.rebuys) * value,
		}));

		updateValidationErrors(value, 'buyInValue');
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

		updateValidationErrors(count, 'buyIns');
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

		if (count > settings.buyIns + settings.rebuys) {
			return;
		} else {
			updateValidationErrors(count, 'playersIn');
		}
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
				validateSettings,
				validationErrors,
			}}
		>
			{children}
		</PokerContext.Provider>
	);
};
