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

import type {
	Level,
	BlindLevel,
	blindInputValue,
	BreakLevel,
	LevelErrors,
} from './types';

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
			duration: 1,
			bigBlind: 20,
			smallBlind: 10,
			ante: 20,
			id: crypto.randomUUID(),
		},
		{
			type: 'blind',
			duration: 1,
			bigBlind: 30,
			smallBlind: 15,
			ante: 30,
			id: crypto.randomUUID(),
		},
		{ type: 'break', duration: 1, id: crypto.randomUUID() },
	]);

	const [currentIndex, setCurrentIndex] = useState<number>(0);

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

	const previousLevel = () => {
		setCurrentIndex((index) => index - 1);
		setIsTournamentFinished(false);
	};

	const nextLevel = useCallback(() => {
		setCurrentIndex((index) => index + 1);
	}, []);

	const startTimer = () => {
		setIsRunning(true);
	};

	const stopTimer = useCallback(() => {
		setIsRunning(false);
	}, []);

	const finishTournament = useCallback(() => {
		setIsTournamentFinished(true);
	}, []);

	const resumeTournament = () => {
		setIsTournamentFinished(false);
	};

	const restartTournament = () => {
		setIsTournamentFinished(false);
		setCurrentIndex(0);
		stopTimer();
	};

	const openFormModal = () => {
		setIsFormModalOpen(true);
	};

	const closeFormModal = () => {
		setIsFormModalOpen(false);
	};

	// counting time logic

	const [timeLeft, setTimeLeft] = useState<number>(currentLevel.duration * 60);

	const lastMinuteSoundRef = useRef<HTMLAudioElement | null>(null);
	const nextBlindSoundRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		if (!isRunning || isTournamentFinished) return;

		setTimeout(() => {
			setTimeLeft(currentLevel.duration * 60);
		}, 0);

		const interval = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 0) return 0;
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, [isRunning, isTournamentFinished, currentLevel]);

	useEffect(() => {
		if (timeLeft === 60) {
			lastMinuteSoundRef.current?.play();
		}

		if (!isLastLevel && timeLeft === 0) {
			setTimeout(() => {
				nextBlindSoundRef.current?.play();
				nextLevel();
			}, 1000);
			return;
		}

		if (isLastLevel && timeLeft === 0) {
			setTimeout(() => {
				stopTimer();
				finishTournament();
			}, 0);
		}
	}, [nextLevel, timeLeft, finishTournament, isLastLevel, stopTimer]);

	useEffect(() => {
		lastMinuteSoundRef.current = new Audio(lastMinuteSound);
		nextBlindSoundRef.current = new Audio(nextBlindSound);
	}, []);

	// End of counting time logic

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
			}}
		>
			{children}
		</TimerContext.Provider>
	);
};
