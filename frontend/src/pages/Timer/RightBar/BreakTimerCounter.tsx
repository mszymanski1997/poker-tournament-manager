import { useEffect, useState } from 'react';
import { useTimerSettings } from '../../../store/TimerSettings/useTimerSettings';

const BreakTimerCounter = () => {
	const { currentLevel, isRunning, nextLevel, levels, currentIndex } =
		useTimerSettings();

	const nextBreakIndex: number = levels
		.slice(currentIndex)
		.findIndex((level) => level.type === 'break');

	const levelsToTheNextBreak = levels.slice(
		currentIndex,
		currentIndex + nextBreakIndex
	);

	const timeToTheNextBreak = levelsToTheNextBreak
		.slice(1)
		.reduce((sum, level) => sum + level.duration, 0);

	const [timeLeft, setTimeLeft] = useState<number>(
		(currentLevel.duration + timeToTheNextBreak) * 60
	);

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
		setTimeLeft((currentLevel.duration + timeToTheNextBreak) * 60);
	}, [currentLevel, timeToTheNextBreak]);

	const hours = Math.floor(timeLeft / 3600);
	const minutes = Math.floor((timeLeft % 3600) / 60);
	const seconds = timeLeft % 60;

	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
	const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

	return (
		currentLevel.type === 'blind' && (
			<li>
				Next break in:
				<span>
					{hours > 0 && `${hours}:`}
					{formattedMinutes}:{formattedSeconds}
				</span>
			</li>
		)
	);
};

export default BreakTimerCounter;
