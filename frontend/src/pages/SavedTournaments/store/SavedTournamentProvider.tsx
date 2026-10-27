import type { ReactNode } from 'react';
import type { SavedTournament } from '../types';
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

	return (
		<SavedTournamentContext.Provider value={{ savedTournament }}>
			{children}
		</SavedTournamentContext.Provider>
	);
};
