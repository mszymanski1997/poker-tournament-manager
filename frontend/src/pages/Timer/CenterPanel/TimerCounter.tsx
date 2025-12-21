import { useEffect, useState } from 'react';
import { useTimerSettings } from '../../../store/TimerSettings/useTimerSettings';
import styles from './TimerCounter.module.scss';

const TimerCounter = () => {
	const { currentLevel, isRunning, nextLevel } = useTimerSettings();

	const [timeLeft, setTimeLeft] = useState<number>(currentLevel.duration * 60);

	useEffect(() => {
		if (!isRunning) return;

		const interval = setInterval(() => {
			if (timeLeft === 0) {
				nextLevel();
				return;
			}

			setTimeLeft((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [isRunning, nextLevel, timeLeft]);

	useEffect(() => {
		setTimeLeft(currentLevel.duration * 60);
	}, [currentLevel]);

	const minutes = Math.floor(timeLeft / 60);
	const seconds = timeLeft % 60;

	const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

	return (
		<p className={styles.counter}>
			{minutes}:{formattedSeconds}
		</p>
	);
};

export default TimerCounter;
