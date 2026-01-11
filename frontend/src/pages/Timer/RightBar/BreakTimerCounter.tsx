import { useTimerSettings } from '../../../store/TimerSettings/useTimerSettings';

const BreakTimerCounter = () => {
	const { currentLevel, levels, currentIndex, timeLeft } = useTimerSettings();

	const nextBreakIndex = levels
		.slice(currentIndex)
		.findIndex((level) => level.type === 'break');

	const willBeNextBreak = nextBreakIndex !== -1;

	let totalSecondsToNextBreak = 0;

	if (willBeNextBreak) {
		const levelsToNextBreak = levels.slice(
			currentIndex,
			currentIndex + nextBreakIndex + 1
		);

		totalSecondsToNextBreak = timeLeft;

		for (let i = 1; i < levelsToNextBreak.length - 1; i++) {
			totalSecondsToNextBreak += levelsToNextBreak[i].duration * 60;
		}
	}

	const hours = Math.floor(totalSecondsToNextBreak / 3600);
	const minutes = Math.floor((totalSecondsToNextBreak % 3600) / 60);
	const seconds = totalSecondsToNextBreak % 60;

	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
	const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

	return (
		currentLevel.type === 'blind' && (
			<li>
				Next break in:
				<span>
					{willBeNextBreak ? (
						<>
							{hours > 0 && `${hours}:`}
							{formattedMinutes}:{formattedSeconds}
						</>
					) : (
						'-'
					)}
				</span>
			</li>
		)
	);
};

export default BreakTimerCounter;
