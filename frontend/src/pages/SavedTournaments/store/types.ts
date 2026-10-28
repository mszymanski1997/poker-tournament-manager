import type { SavedTournament } from '../types';

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
};
