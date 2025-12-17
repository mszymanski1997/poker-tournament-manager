import { createContext } from 'react';

import { type PokerContextSettings } from './types';

export const PokerContext = createContext<PokerContextSettings | undefined>(
	undefined
);
