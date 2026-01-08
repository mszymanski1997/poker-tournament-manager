import styles from './CentralPanel.module.scss';
import Button from '../../../components/shared/Button/Button';
import TimerCounter from './TimerCounter';
import {
	MdPlayArrow,
	MdSkipPrevious,
	MdSkipNext,
	MdPause,
} from 'react-icons/md';
import { useTimerSettings } from '../../../store/TimerSettings/useTimerSettings';

type CentralPanelProps = {
	onOpenSettings: () => void;
};

const CentralPanel = ({ onOpenSettings }: CentralPanelProps) => {
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
		restartTournament,
	} = useTimerSettings();

	const isBlind = currentLevel.type === 'blind';

	return (
		<div className={styles.container}>
			<TimerCounter />
			{!isTournamentFinished && (
				<div className={styles.blindsInfo}>
					<p>Current Blinds:</p>
					<p className={styles.blinds}>
						{isBlind
							? currentLevel.bigBlind + ' / ' + currentLevel.smallBlind
							: 'BREAK'}
					</p>
					<p>
						Ante: <span>{isBlind ? currentLevel.ante : '-'}</span>
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

			<div className={styles.settingsButtons}>
				<Button size='big'>Load settings</Button>
				<Button size='big' onClick={restartTournament}>
					Restart
				</Button>
				<Button size='big' onClick={onOpenSettings}>
					{isTournamentFinished ? 'Add new blinds' : 'Custom settings'}
				</Button>
			</div>
		</div>
	);
};

export default CentralPanel;
