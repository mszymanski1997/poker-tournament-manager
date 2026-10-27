import { useContext } from 'react';
import { SavedTournamentContext } from './SavedTournamentContext';

export const useSavedTournament = () => {
	const context = useContext(SavedTournamentContext);

	if (!context) {
		throw new Error(
			'useSavedTournament must be used within SavedTournamentProvider',
		);
	}

	return context;
};
