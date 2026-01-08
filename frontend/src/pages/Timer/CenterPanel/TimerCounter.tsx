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
		if (!isRunning || isTournamentFinished) return;

		if (timeLeft === 0 && !isLastLevel) {
			setTimeout(() => {
				nextLevel();
			}, 900);
		}

		const interval = setInterval(() => {
			if (timeLeft - 1 === 0) {
				nextBlindSoundRef.current?.play();

				if (isLastLevel) {
					stopTimer();
					finishTournament();
					return;
				}
			}

			if (timeLeft - 1 === 60) {
				lastMinuteSoundRef.current?.play();
			}

			setTimeLeft((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [
		isRunning,
		nextLevel,
		timeLeft,
		finishTournament,
		isLastLevel,
		isTournamentFinished,
		stopTimer,
	]);

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
