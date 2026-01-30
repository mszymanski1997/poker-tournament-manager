import type { Level } from './types';

export const DEFAULT_LEVELS: Level[] = [
	{
		type: 'blind',
		duration: 2,
		bigBlind: 100,
		smallBlind: 50,
		ante: 100,
		id: crypto.randomUUID(),
	},
	{
		type: 'blind',
		duration: 2,
		bigBlind: 200,
		smallBlind: 100,
		ante: 200,
		id: crypto.randomUUID(),
	},
	{
		type: 'blind',
		duration: 2,
		bigBlind: 300,
		smallBlind: 150,
		ante: 300,
		id: crypto.randomUUID(),
	},
	{
		type: 'blind',
		duration: 2,
		bigBlind: 400,
		smallBlind: 200,
		ante: 400,
		id: crypto.randomUUID(),
	},
];
