import { useState, type ReactNode } from 'react';
import { TimerContext } from './TimerContext';
import type { Level } from './types';

export const TimerProvider = ({ children }: { children: ReactNode }) => {
	const [levels, setLevels] = useState<Level[]>([
		{
			type: 'blind',
			duration: 25,
			bigBlind: 10,
			smallBlind: 5,
			ante: 10,
		},
	]);

	const [currentIndex, setCurrentIndex] = useState<number>(0);

	const [isRunning, setIsRunning] = useState<boolean>(false);

	const currentLevel = levels[currentIndex];
	const isFirstLevel = currentIndex === 0;
	const isLastLevel = currentIndex === levels.length - 1;

	const updateLevels = (newLevels: Level[]) => {
		setLevels(newLevels);
	};

	const nextLevel = () => {
		setCurrentIndex((index) => index + 1);
	};

	const previousLevel = () => {
		setCurrentIndex((index) => index - 1);
	};

	const startTimer = () => {
		setIsRunning(true);
	};

	const stopTimer = () => {
		setIsRunning(false);
	};

	return (
		<TimerContext.Provider
			value={{
				levels,
				currentIndex,
				isRunning,
				nextLevel,
				previousLevel,
				currentLevel,
				isFirstLevel,
				isLastLevel,
				startTimer,
				stopTimer,
				updateLevels,
			}}
		>
			{children}
		</TimerContext.Provider>
	);
};
