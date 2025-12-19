import styles from './CentralPanel.module.scss';
import Button from '../../../components/shared/Button/Button';
import { MdPlayArrow, MdSkipPrevious, MdSkipNext } from 'react-icons/md';
import { useTimerSettings } from '../../../store/TimerSettings/useTimerSettings';

type CentralPanelProps = {
	onOpenSettings: () => void;
};

const CentralPanel = ({ onOpenSettings }: CentralPanelProps) => {
	const { currentLevel, nextLevel, previousLevel, isFirstLevel, isLastLevel } =
		useTimerSettings();

	const isBlind = currentLevel.type === 'blind';

	return (
		<div className={styles.container}>
			<p className={styles.time}>25:00</p>

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

			<div className={styles.timerButtons}>
				<Button onClick={previousLevel} disabled={isFirstLevel}>
					<MdSkipPrevious />
				</Button>
				<Button>
					<MdPlayArrow />
				</Button>
				<Button onClick={nextLevel} disabled={isLastLevel}>
					<MdSkipNext />
				</Button>
			</div>

			<div className={styles.settingsButtons}>
				<Button size='big'>Load settings</Button>
				<Button size='big' onClick={onOpenSettings}>
					Custom settings
				</Button>
			</div>
		</div>
	);
};

export default CentralPanel;
