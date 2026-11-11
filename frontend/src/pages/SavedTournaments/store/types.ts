import type { SavedTournament, SavedTournamentLevel } from '../types';

export type TopSettingsType = {
	name: string;
	buyIn: number;
	startingStack: number;
	currency: string;
};

export type SavedTournamentContextTypes = {
	savedTournament: SavedTournament;
	showSavedTournament: () => void;

	updateOneSetting: (
		setting: keyof TopSettingsType,
		value: string | number,
	) => void;

	updateNestedSetting: (group: 'rake' | 'addons', value: number) => void;

	updateLevel: (
		id: string,
		key: keyof Omit<SavedTournamentLevel, 'id' | 'type'>,
		value: number,
	) => void;

	setRakeEnabled: () => void;
	setAddonsEnabled: () => void;
	setSettingDisabled: (setting: 'addons' | 'rake') => void;

	addNewLevel: (type: 'break' | 'blind') => void;
	removeLevel: (id: string) => void;
};
