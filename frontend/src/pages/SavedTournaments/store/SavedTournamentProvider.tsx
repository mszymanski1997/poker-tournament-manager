import type { ReactNode } from 'react';
import type { SavedTournament } from '../types';
import type { TopSettingsType } from './types';
import { useState } from 'react';
import { SavedTournamentContext } from './SavedTournamentContext';

type SavedTournamentProviderProps = {
	children: ReactNode;
};

export const SavedTournamentProvider = ({
	children,
}: SavedTournamentProviderProps) => {
	const [savedTournament, setSavedTournament] = useState<SavedTournament>({
		name: '',
		buyIn: 0,
		startingStack: 0,
		currency: 'PLN',
		levels: [
			{
				type: 'blind',
				bigBlind: 0,
				smallBlind: 0,
				ante: 0,
				duration: 0,
				id: crypto.randomUUID(),
			},
			{
				type: 'blind',
				bigBlind: 0,
				smallBlind: 0,
				ante: 0,
				duration: 0,
				id: crypto.randomUUID(),
			},
			{
				type: 'blind',
				bigBlind: 0,
				smallBlind: 0,
				ante: 0,
				duration: 0,
				id: crypto.randomUUID(),
			},
		],
	});

	const updateOneSetting = (
		setting: keyof TopSettingsType,
		value: number | string,
	) => {
		setSavedTournament((prev) => {
			return {
				...prev,
				[setting]: value,
			};
		});
	};

	const setRakeEnabled = () => {
		setSavedTournament((prev) => {
			return {
				...prev,
				rake: {
					enabled: true,
					value: 0,
				},
			};
		});
	};

	const setAddonsEnabled = () => {
		setSavedTournament((prev) => {
			return {
				...prev,
				addons: {
					enabled: true,
					value: 0,
				},
			};
		});
	};

	const setSettingDisabled = (setting: 'rake' | 'addons') => {
		setSavedTournament((prev) => {
			const updated = { ...prev };
			delete updated[setting];
			return updated;
		});
	};

	const updateNestedSetting = (group: 'rake' | 'addons', value: number) => {
		setSavedTournament((prev) => ({
			...prev,
			[group]: {
				...prev[group],
				value,
			},
		}));
	};

	const addNewLevel = (type: 'break' | 'blind') => {
		let newLevel;

		if (type === 'break') {
			newLevel = {
				type: 'break' as const,
				duration: 0,
				id: crypto.randomUUID(),
			};
		} else {
			newLevel = {
				type: 'blind' as const,
				bigBlind: 0,
				smallBlind: 0,
				ante: 0,
				duration: 0,
				id: crypto.randomUUID(),
			};
		}

		setSavedTournament((prev) => ({
			...prev,
			levels: [...prev.levels, newLevel],
		}));
	};

	const removeLevel = (id: string) => {
		setSavedTournament((prev) => {
			return {
				...prev,
				levels: [...prev.levels.filter((level) => level.id !== id)],
			};
		});
	};

	const showSavedTournament = () => {
		console.log(savedTournament);
	};

	return (
		<SavedTournamentContext.Provider
			value={{
				savedTournament,
				updateOneSetting,
				showSavedTournament,
				setRakeEnabled,
				setAddonsEnabled,
				setSettingDisabled,
				updateNestedSetting,
				addNewLevel,
				removeLevel,
			}}
		>
			{children}
		</SavedTournamentContext.Provider>
	);
};
