import lastMinuteSound from '../../../assets/audio/lastMinuteSound.wav';
import nextBlindSound from '../../../assets/audio/nextBlindSound.wav';
import { useEffect, useRef, useState } from 'react';
import { useTimerSettings } from '../../../store/TimerSettings/useTimerSettings';
import styles from './TimerCounter.module.scss';

const TimerCounter = () => {
	const lastMinuteSoundRef = useRef<HTMLAudioElement | null>(null);
	const nextBlindSoundRef = useRef<HTMLAudioElement | null>(null);

	const {
		currentLevel,
		isRunning,
		nextLevel,
		isTournamentFinished,
		isLastLevel,
		finishTournament,
		stopTimer,
	} = useTimerSettings();

	const [timeLeft, setTimeLeft] = useState<number>(currentLevel.duration * 60);

	const isLastMinute: boolean = timeLeft <= 60;

	useEffect(() => {
		if (timeLeft === 60) {
			lastMinuteSoundRef.current?.play();
		}

		if (!isLastLevel && timeLeft === -1) {
			nextBlindSoundRef.current?.play();
			nextLevel();
			return;
		}

		if (isLastLevel && timeLeft === 0) {
			stopTimer();
			finishTournament();
			return;
		}
	}, [nextLevel, timeLeft, finishTournament, isLastLevel, stopTimer]);

	useEffect(() => {
		if (!isRunning || isTournamentFinished) return;

		const interval = setInterval(() => {
			setTimeLeft((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [isRunning, isTournamentFinished]);

	useEffect(() => {
		setTimeLeft(currentLevel.duration * 60);
	}, [currentLevel]);

	useEffect(() => {
		lastMinuteSoundRef.current = new Audio(lastMinuteSound);
		nextBlindSoundRef.current = new Audio(nextBlindSound);
	}, []);

	const minutes = Math.floor(timeLeft / 60);
	const seconds = timeLeft % 60;

	const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

	return (
		<>
			{isTournamentFinished ? (
				<p className={styles.finished}>Tournament Finished</p>
			) : (
				<p className={`${styles.counter} ${isLastMinute && styles.warning}`}>
					{minutes}:{formattedSeconds}
				</p>
			)}
		</>
	);
};

export default TimerCounter;
