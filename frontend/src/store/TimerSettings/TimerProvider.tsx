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
			id: crypto.randomUUID(),
		},
		{
			type: 'blind',
			duration: 25,
			bigBlind: 20,
			smallBlind: 10,
			ante: 20,
			id: crypto.randomUUID(),
		},
		{
			type: 'blind',
			duration: 25,
			bigBlind: 30,
			smallBlind: 15,
			ante: 30,
			id: crypto.randomUUID(),
		},
	]);

	const [currentIndex, setCurrentIndex] = useState<number>(0);

	const [isRunning, setIsRunning] = useState<boolean>(false);

	const currentLevel = levels[currentIndex];
	const upcomingLevel = levels[currentIndex + 1];
	const isFirstLevel = currentIndex === 0;
	const isLastLevel = currentIndex === levels.length - 1;

	const addNewLevel = (type: 'blind' | 'break') => {
		if (type === 'blind') {
			setLevels((prev) => [
				...prev,
				{
					type: 'blind',
					id: crypto.randomUUID(),
					duration: 0,
					bigBlind: 0,
					smallBlind: 0,
					ante: 0,
				},
			]);
		} else {
			setLevels((prev) => [
				...prev,
				{
					type: 'break',
					id: crypto.randomUUID(),
					duration: 0,
				},
			]);
		}
	};

	const removeLevel = (id: string) => {
		setLevels(levels.filter((level) => level.id !== id));
	};

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
				upcomingLevel,
				isFirstLevel,
				isLastLevel,
				startTimer,
				stopTimer,
				updateLevels,
				addNewLevel,
				removeLevel,
			}}
		>
			{children}
		</TimerContext.Provider>
	);
};
