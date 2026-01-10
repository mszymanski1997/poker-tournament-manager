import { useTimerSettings } from '../../../../store/TimerSettings/useTimerSettings';
import styles from './BlindsSettingsSection.module.scss';
import Input from '../../Input/Input';
import Button from '../../Button/Button';

const BlindsSettingsSection = () => {
	const {
		levels,
		getBlindValue,
		getBreakValue,
		updateBlindLevel,
		updateBreakLevel,
		removeLevel,
	} = useTimerSettings();

	return (
		<>
			{levels.map((level) => {
				if (level.type === 'blind') {
					return (
						<div
							className={styles.blindsSettings}
							key={level.id}
							id={`settings-${level.id}`}
						>
							<Input
								label='Big Blind:'
								onChange={(e) =>
									updateBlindLevel(level.id, 'bigBlind', +e.target.value)
								}
								value={getBlindValue('bigBlind', level.id)}
							/>
							<Input
								label='Small Blind:'
								onChange={(e) =>
									updateBlindLevel(level.id, 'smallBlind', +e.target.value)
								}
								value={getBlindValue('smallBlind', level.id)}
							/>
							<Input
								label='Ante:'
								onChange={(e) =>
									updateBlindLevel(level.id, 'ante', +e.target.value)
								}
								value={getBlindValue('ante', level.id)}
							/>
							<Input
								label='Duration:'
								onChange={(e) =>
									updateBlindLevel(level.id, 'duration', +e.target.value)
								}
								value={getBlindValue('duration', level.id)}
							/>
							<Button
								className={styles.xButton}
								onClick={() => removeLevel(level.id)}
							>
								X
							</Button>
						</div>
					);
				}

				return (
					<div className={styles.breakSettings} key={level.id}>
						<Input
							label='Break Duration:'
							onChange={(e) => updateBreakLevel(level.id, +e.target.value)}
							value={getBreakValue(level.id)}
						/>
						<Button
							className={styles.xButton}
							onClick={() => removeLevel(level.id)}
						>
							X
						</Button>
					</div>
				);
			})}
		</>
	);
};

export default BlindsSettingsSection;
