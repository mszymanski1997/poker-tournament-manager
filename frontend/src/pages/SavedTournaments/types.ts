export type Rake = {
	enabled: boolean;
	value: number;
};

export type Addon = {
	enabled: boolean;
	value: number;
	count: boolean;
};

export type SavedTournamentLevel = {
	type: 'blind' | 'break';
	duration: number;
	bigBlind?: number;
	smallBlind?: number;
	ante?: number;
};

export type SavedTournament = {
	name: string;
	buyIn: number;
	startingStack: number;
	currency: string;
	owner: string;
	_id: string;
	rake: Rake;
	addons: Addon;
	levels: SavedTournamentLevel[];
};
