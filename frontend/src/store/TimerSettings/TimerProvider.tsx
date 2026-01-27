import {
	useEffect,
	useState,
	useRef,
	useCallback,
	type ReactNode,
} from 'react';
import { TimerContext } from './TimerContext';
import lastMinuteSound from '../../assets/audio/lastMinuteSound.wav';
import nextBlindSound from '../../assets/audio/nextBlindSound.wav';
import { useLocalStorage } from '../../hooks/useLocalStorage.ts';

import type {
	Level,
	BlindLevel,
	blindInputValue,
	BreakLevel,
	LevelErrors,
	LevelLocalStorageData,
} from './types';
import { DEFAULT_LEVELS } from './defaultLevels';

export const TimerProvider = ({ children }: { children: ReactNode }) => {
	const levelsStorage = useLocalStorage<Level[]>('levels');

	const levelsToExpiryStorage = useLocalStorage<Level[]>('levelsToExpiry');

	const { setValueWithExpiry, getValueWithExpiry } =
		useLocalStorage<LevelLocalStorageData>('level');

	const [levels, setLevels] = useState<Level[]>(() => {
		return levelsToExpiryStorage.getValueWithExpiry() ?? DEFAULT_LEVELS;
	});

	const [currentIndex, setCurrentIndex] = useState<number>(() => {
		const localStorageData = getValueWithExpiry();

		return localStorageData?.levelIndex ?? 0;
	});

	const [isRunning, setIsRunning] = useState<boolean>(false);

	const [isTournamentFinished, setIsTournamentFinished] =
		useState<boolean>(false);

	const [isWarningMessageVisible, setisWarningMessageVisible] =
		useState<boolean>(false);

	const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);

	const [levelsErrors, setLevelsErrors] = useState<LevelErrors>({});

	const updateLevelsErrors = (errors: LevelErrors) => {
		setLevelsErrors(errors);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setisWarningMessageVisible(false);
		}, 5000);

		return () => clearTimeout(timer);
	}, [isWarningMessageVisible]);

	const currentLevel = levels[currentIndex];
	const upcomingLevel = levels[currentIndex + 1];
	const isFirstLevel = currentIndex === 0;
	const isLastLevel = currentIndex === levels.length - 1;
	const middleTournamentIndex = Math.ceil(levels.length / 2);

	const totalTournamentDuration = levels.reduce(
		(sum, level) => sum + level.duration,
		0,
	);

	const currentBlindIndex = levels
		.slice(0, currentIndex + 1)
		.filter((level) => level.type === 'blind').length;

	const addNewLevel = (type: 'blind' | 'break') => {
		setisWarningMessageVisible(false);

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

		setIsTournamentFinished(false);
	};

	const removeLevel = (id: string) => {
		if (levels.length === 1) {
			setisWarningMessageVisible(true);
			return;
		}

		if (currentIndex === levels.length - 1) {
			setCurrentIndex((prev) => prev - 1);
		}

		setLevels(levels.filter((level) => level.id !== id));
	};

	const updateBlindLevel = (
		id: string,
		key: keyof BlindLevel,
		value: number,
	) => {
		setLevels((prev) =>
			prev.map((level) =>
				level.id === id && level.type === 'blind'
					? { ...level, [key]: value }
					: level,
			),
		);
	};

	const updateBreakLevel = (id: string, value: number) => {
		setLevels((prev) =>
			prev.map((level) =>
				level.id === id && level.type === 'break'
					? { ...level, duration: value }
					: level,
			),
		);
	};

	const getBlindValue = (
		key: keyof blindInputValue,
		id: string,
	): number | undefined => {
		const level = levels.find(
			(level): level is BlindLevel => level.id === id && level.type === 'blind',
		);

		if (level) return level[key];

		return undefined;
	};

	const getBreakValue = (id: string): number | undefined => {
		const level = levels.find(
			(level): level is BreakLevel => level.id === id && level.type === 'break',
		);

		if (level) return level.duration;

		return undefined;
	};

	const [timeLeft, setTimeLeft] = useState<number>(() => {
		const storedLevel = getValueWithExpiry();

		return storedLevel?.timeLeft ?? currentLevel.duration * 60;
	});

	const previousLevel = () => {
		setCurrentIndex((index) => index - 1);

		if (isTournamentFinished) {
			setCurrentIndex(levels.length - 1);
			setTimeLeft(currentLevel.duration * 60);
			setIsTournamentFinished(false);
		}
	};

	const nextLevel = useCallback(() => {
		setCurrentIndex((index) => index + 1);
	}, [setCurrentIndex]);

	const startTimer = () => {
		setIsRunning(true);
	};

	const stopTimer = useCallback(() => {
		setIsRunning(false);
	}, [setIsRunning]);

	const finishTournament = useCallback(() => {
		setIsTournamentFinished(true);
	}, []);

	const resumeTournament = () => {
		setIsTournamentFinished(false);
	};

	const loadLastSettings = () => {
		const savedLevels = levelsStorage.getValue();

		if (!savedLevels) return;

		setLevels(savedLevels);

		levelsToExpiryStorage.setValueWithExpiry(
			savedLevels,
			totalTournamentDuration,
		);
	};

	const restartTournament = () => {
		setIsTournamentFinished(false);

		if (currentIndex === 0) {
			setTimeLeft(currentLevel.duration * 60);
		} else {
			setCurrentIndex(0);
		}

		localStorage.removeItem('settings');
		localStorage.removeItem('level');
		stopTimer();
	};

	const openFormModal = () => {
		setIsFormModalOpen(true);
	};

	const closeFormModal = () => {
		setIsFormModalOpen(false);
	};

	// counting time logic

	const lastMinuteSoundRef = useRef<HTMLAudioElement | null>(null);
	const nextBlindSoundRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		if (!isRunning || isTournamentFinished) return;

		const interval = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev === 61) {
					lastMinuteSoundRef.current?.play();
				}

				if (middleTournamentIndex === currentIndex && prev === 50) {
					levelsStorage.setValue(levels);
				}

				if (prev > 0) {
					setValueWithExpiry(
						{
							levelIndex: currentIndex,
							timeLeft: timeLeft - 1,
						},
						currentLevel.duration * 2,
					);
				}

				if (prev === 0) {
					nextBlindSoundRef.current?.play();
				}

				if (isLastLevel && prev === 0) {
					stopTimer();
					finishTournament();
				}

				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(interval);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		isRunning,
		isTournamentFinished,
		currentLevel,
		isLastLevel,
		stopTimer,
		finishTournament,
		setValueWithExpiry,
		currentIndex,
	]);

	useEffect(() => {
		if (!isLastLevel && timeLeft < 0) {
			setTimeout(() => {
				nextLevel();
			}, 0);
		}
	}, [nextLevel, isLastLevel, timeLeft]);

	useEffect(() => {
		setTimeLeft(currentLevel.duration * 60);
	}, [currentLevel]);

	useEffect(() => {
		lastMinuteSoundRef.current = new Audio(lastMinuteSound);
		nextBlindSoundRef.current = new Audio(nextBlindSound);
	}, []);

	// End of counting time logic

	useEffect(() => {
		const storedLevel = getValueWithExpiry();

		if (!storedLevel) return;

		setTimeLeft(storedLevel.timeLeft);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
				restartTournament,
				isWarningMessageVisible,
				isFormModalOpen,
				closeFormModal,
				openFormModal,
				levelsErrors,
				updateLevelsErrors,
				timeLeft,
				loadLastSettings,
				totalTournamentDuration,
			}}
		>
			{children}
		</TimerContext.Provider>
	);
};
