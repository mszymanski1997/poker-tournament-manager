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
import { usePokerSettings } from '../../../store/PokerSettings/usePokerSettings';
import DisabledTooltip from '../../../components/shared/DisabledTooltip/DisabledTooltip';

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

	const { settings } = usePokerSettings();

	const formatBlind = useBlindsFormatter();

	const isBlind = currentLevel.type === 'blind';

	const isPlayBtnDisabled =
		isTournamentFinished || settings.playersIn <= 1 || settings.buyIns <= 1;

	const getDisabledReason = () => {
		if (isTournamentFinished) {
			return 'Tournament is finished';
		} else if (settings.buyIns <= 1) {
			return 'Add at least 2 buy-ins to start';
		} else if (settings.playersIn <= 1) {
			return 'Add at least 2 players to start';
		}

		return '';
	};

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
					<DisabledTooltip
						isDisabled={isFirstLevel}
						text='Already at the first level'
					>
						<Button onClick={previousLevel} disabled={isFirstLevel}>
							<MdSkipPrevious />
						</Button>
					</DisabledTooltip>
					{isRunning ? (
						<Button onClick={stopTimer}>
							<MdPause />
						</Button>
					) : (
						<DisabledTooltip
							isDisabled={isPlayBtnDisabled}
							text={getDisabledReason()}
						>
							<Button onClick={startTimer} disabled={isPlayBtnDisabled}>
								<MdPlayArrow />
							</Button>
						</DisabledTooltip>
					)}

					<DisabledTooltip
						isDisabled={isLastLevel}
						text='Already at the last level'
					>
						<Button onClick={nextLevel} disabled={isLastLevel}>
							<MdSkipNext />
						</Button>
					</DisabledTooltip>
				</div>
				<SettingsButtons />
			</div>
		</>
	);
};

export default CentralPanel;
