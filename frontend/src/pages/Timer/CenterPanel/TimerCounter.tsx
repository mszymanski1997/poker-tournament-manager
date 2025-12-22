import lastMinuteSound from '../../../assets/audio/lastMinuteSound.wav';
import nextBlindSound from '../../../assets/audio/nextBlindSound.wav';
import { useEffect, useRef, useState } from 'react';
import { useTimerSettings } from '../../../store/TimerSettings/useTimerSettings';
import styles from './TimerCounter.module.scss';

const TimerCounter = () => {
	const lastMinuteSoundRef = useRef<HTMLAudioElement | null>(null);
	const nextBlindSoundRef = useRef<HTMLAudioElement | null>(null);

	const { currentLevel, isRunning, nextLevel } = useTimerSettings();

	const [timeLeft, setTimeLeft] = useState<number>(currentLevel.duration * 60);

	const isLastMinute: boolean = timeLeft <= 60;

	useEffect(() => {
		if (!isRunning) return;

		const interval = setInterval(() => {
			if (timeLeft === 0) {
				nextBlindSoundRef.current?.play();
				nextLevel();
				return;
			}

			if (timeLeft - 1 === 60) {
				lastMinuteSoundRef.current?.play();
			}

			setTimeLeft((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [isRunning, nextLevel, timeLeft]);

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
		<p className={`${styles.counter} ${isLastMinute && styles.warning}`}>
			{minutes}:{formattedSeconds}
		</p>
	);
};

export default TimerCounter;
