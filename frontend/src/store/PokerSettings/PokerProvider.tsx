import { useLocalStorage } from '../../hooks/useLocalStorage';
import { PokerContext } from './PokerContext';
import {
	type Currency,
	type GameSettings,
	type GameSettingsErrors,
} from './types';
import { useEffect, useState, type ReactNode } from 'react';
import { INITIAL_SETTINGS } from './initialSettings';

export const PokerProvider = ({ children }: { children: ReactNode }) => {
	const { getValueWithExpiry } = useLocalStorage<GameSettings>('settings');

	const [settings, setSettings] = useState<GameSettings>(() => {
		return getValueWithExpiry() ?? INITIAL_SETTINGS;
	});

	const [validationErrors, setValidationErrors] = useState<GameSettingsErrors>(
		{},
	);

	const [currency, setCurrency] = useState<Currency>('$');

	useEffect(() => {
		console.log(currency);
	}, [currency]);

	const updateCurrency = (currency: Currency) => {
		setCurrency(currency);
	};

	const restartPokerSettings = () => {
		setSettings(INITIAL_SETTINGS);
	};

	const validateSettings = () => {
		const newErrors: GameSettingsErrors = {};

		if (settings.startingStack <= 0) {
			newErrors.startingStack = 'Starting stack must be greater than 0';
		}

		if (settings.buyInValue <= 0) {
			newErrors.buyInValue = 'Buy-in value must be greater than 0';
		}

		if (settings.rebuys < 0) {
			newErrors.rebuys = 'The number of rebuys cannot be negative.';
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

		const integers: (keyof GameSettingsErrors)[] = [
			'startingStack',
			'buyInValue',
			'buyIns',
			'playersIn',
			'rebuys',
		];

		integers.forEach((field) => {
			if (!Number.isInteger(settings[field])) {
				newErrors[field] = 'The value must be an integer';
			}
		});

		setValidationErrors(newErrors);

		return newErrors;
	};

	const updateValidationErrors = (
		value: number,
		field: keyof GameSettingsErrors,
	) => {
		if (value > 0 && Number.isInteger(value)) {
			setValidationErrors((prev) => {
				if (!prev[field]) return prev;
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { [field]: _, ...rest } = prev;
				return rest;
			});
		}
	};

	const updateOneSetting = (setting: keyof GameSettings, value: number) => {
		setSettings((prev) => {
			return {
				...prev,
				[setting]: value,
			};
		});

		updateValidationErrors(value, setting);
	};

	return (
		<PokerContext.Provider
			value={{
				settings,
				currency,
				validateSettings,
				validationErrors,
				restartPokerSettings,
				updateOneSetting,
				updateCurrency,
			}}
		>
			{children}
		</PokerContext.Provider>
	);
};
