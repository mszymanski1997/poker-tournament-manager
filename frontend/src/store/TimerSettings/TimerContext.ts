import { createContext } from 'react';
import { type TimerContextValue } from './types';

export const TimerContext = createContext<TimerContextValue | undefined>(
	undefined
);
