export type Rake = {
	enabled: boolean;
	value: number;
};

export type Addon = {
	enabled: boolean;
	value: number;
};

export type SavedTournamentLevel = {
	type: 'blind' | 'break';
	duration: number;
	bigBlind?: number;
	smallBlind?: number;
	ante?: number;
	id?: string;
};

export type SavedTournament = {
	name: string;
	buyIn: number;
	startingStack: number;
	currency: string;
	owner?: string;
	_id?: string;
	rake?: Rake;
	addons?: Addon;
	levels: SavedTournamentLevel[];
};

// errors types

export type LevelErrors = {
	duration?: string;
	bigBlind?: string;
	smallBlind?: string;
	ante?: string;
};

export type TournamentFormErros = {
	name?: string;
	buyIn?: string;
	startingStack?: string;
	rake?: string;
	addons?: string;
	levels?: Record<string, LevelErrors>;
};
