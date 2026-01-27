import styles from './CentralPanel.module.scss';
import Button from '../../../components/shared/Button/Button';
import SettingsButtons from './SettingsButtons';
import TimerCounter from './TimerCounter';
import {
	MdPlayArrow,
	MdSkipPrevious,
	MdSkipNext,
	MdPause,
} from 'react-icons/md';
import { useTimerSettings } from '../../../store/TimerSettings/useTimerSettings';
import { useBlindsFormatter } from '../../../hooks/useBlindsFormatter';

const CentralPanel = () => {
	const {
		currentLevel,
		nextLevel,
		previousLevel,
		isFirstLevel,
		isLastLevel,
		startTimer,
		stopTimer,
		isRunning,
		isTournamentFinished,
	} = useTimerSettings();

	const formatBlind = useBlindsFormatter();

	const isBlind = currentLevel.type === 'blind';

	return (
		<>
			<div className={styles.container}>
				<TimerCounter />
				{!isTournamentFinished && (
					<div className={styles.blindsInfo}>
						<p>Current Blinds:</p>
						<p className={styles.blinds}>
							{isBlind
								? formatBlind(currentLevel.bigBlind, 10000) +
									' / ' +
									formatBlind(currentLevel.smallBlind, 5000)
								: 'BREAK'}
						</p>
						<p>
							Ante:{' '}
							<span>
								{isBlind ? formatBlind(currentLevel.ante, 10000) : '-'}
							</span>
						</p>
					</div>
				)}

				<div className={styles.timerButtons}>
					<Button onClick={previousLevel} disabled={isFirstLevel}>
						<MdSkipPrevious />
					</Button>
					{isRunning ? (
						<Button onClick={stopTimer}>
							<MdPause />
						</Button>
					) : (
						<Button onClick={startTimer} disabled={isTournamentFinished}>
							<MdPlayArrow />
						</Button>
					)}

					<Button onClick={nextLevel} disabled={isLastLevel}>
						<MdSkipNext />
					</Button>
				</div>
				<SettingsButtons />
			</div>
		</>
	);
};

export default CentralPanel;
