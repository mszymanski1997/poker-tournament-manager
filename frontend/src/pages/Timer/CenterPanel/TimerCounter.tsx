import { useTimerSettings } from '../../../store/TimerSettings/useTimerSettings';
import styles from './TimerCounter.module.scss';

const TimerCounter = () => {
	const { isTournamentFinished, timeLeft } = useTimerSettings();

	const isLastMinute: boolean = timeLeft <= 60;

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
