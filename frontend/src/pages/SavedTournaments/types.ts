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
	levels: SavedTournamentLevel[];
};
