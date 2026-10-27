import { createContext } from 'react';
import type { SavedTournamentContextTypes } from './types';

export const SavedTournamentContext = createContext<
	SavedTournamentContextTypes | undefined
>(undefined);
