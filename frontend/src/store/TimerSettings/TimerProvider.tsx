import { useState, type ReactNode } from 'react';
import { TimerContext } from './TimerContext';
import type { Level, BlindLevel, blindInputValue, BreakLevel } from './types';

export const TimerProvider = ({ children }: { children: ReactNode }) => {
	const [levels, setLevels] = useState<Level[]>([
		{
			type: 'blind',
			duration: 0.05,
			bigBlind: 10,
			smallBlind: 5,
			ante: 10,
			id: crypto.randomUUID(),
		},
		{
			type: 'blind',
			duration: 0.05,
			bigBlind: 20,
			smallBlind: 10,
			ante: 20,
			id: crypto.randomUUID(),
		},
	]);

	const [currentIndex, setCurrentIndex] = useState<number>(0);

	const [isRunning, setIsRunning] = useState<boolean>(false);

	const [isTournamentFinished, setIsTournamentFinished] =
		useState<boolean>(false);

	const currentLevel = levels[currentIndex];
	const upcomingLevel = levels[currentIndex + 1];
	const isFirstLevel = currentIndex === 0;
	const isLastLevel = currentIndex === levels.length - 1;

	const currentBlindIndex = levels
		.slice(0, currentIndex + 1)
		.filter((level) => level.type === 'blind').length;

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

		if (isTournamentFinished) {
			setIsTournamentFinished(false);
		}
	};

	const removeLevel = (id: string) => {
		setLevels(levels.filter((level) => level.id !== id));
	};

	const updateBlindLevel = (
		id: string,
		key: keyof BlindLevel,
		value: number
	) => {
		setLevels((prev) =>
			prev.map((level) =>
				level.id === id && level.type === 'blind'
					? { ...level, [key]: value }
					: level
			)
		);
	};

	const updateBreakLevel = (id: string, value: number) => {
		setLevels((prev) =>
			prev.map((level) =>
				level.id === id && level.type === 'break'
					? { ...level, duration: value }
					: level
			)
		);
	};

	const getBlindValue = (
		key: keyof blindInputValue,
		id: string
	): number | undefined => {
		const level = levels.find(
			(level): level is BlindLevel => level.id === id && level.type === 'blind'
		);

		if (level) return level[key];

		return undefined;
	};

	const getBreakValue = (id: string): number | undefined => {
		const level = levels.find(
			(level): level is BreakLevel => level.id === id && level.type === 'break'
		);

		if (level) return level.duration;

		return undefined;
	};

	const nextLevel = () => {
		setCurrentIndex((index) => index + 1);
	};

	const previousLevel = () => {
		setCurrentIndex((index) => index - 1);

		if (isTournamentFinished) {
			setIsTournamentFinished(false);
		}
	};

	const startTimer = () => {
		setIsRunning(true);
	};

	const stopTimer = () => {
		setIsRunning(false);
	};

	const finishTournament = () => {
		setIsTournamentFinished(true);
	};

	const resumeTournament = () => {
		setIsTournamentFinished(false);
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
				updateBlindLevel,
				updateBreakLevel,
				addNewLevel,
				removeLevel,
				getBlindValue,
				getBreakValue,
				currentBlindIndex,
				isTournamentFinished,
				finishTournament,
				resumeTournament,
			}}
		>
			{children}
		</TimerContext.Provider>
	);
};
