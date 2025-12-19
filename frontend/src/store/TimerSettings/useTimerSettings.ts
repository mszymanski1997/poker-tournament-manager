import { useContext } from 'react';
import { TimerContext } from './TimerContext';

export const useTimerSettings = () => {
	const context = useContext(TimerContext);

	if (!context) {
		throw new Error('usePoker must be used within TimerProvider');
	}

	return context;
};
