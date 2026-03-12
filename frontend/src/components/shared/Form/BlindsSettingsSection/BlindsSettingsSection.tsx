import styles from './BlindsSettingsSection.module.scss';
import Input from '../../FormElements/Input';
import Button from '../../Button/Button';
import { useLevelsValidation } from '../../../../store/TimerSettings/useLevelsValidation';
import { useTimerSettings } from '../../../../store/TimerSettings/useTimerSettings';
import { type LevelField } from '../../../../store/TimerSettings/types';

const BlindsSettingsSection = () => {
	const {
		levels,
		getBlindValue,
		getBreakValue,
		updateBlindLevel,
		updateBreakLevel,
		removeLevel,
		levelsErrors,
	} = useTimerSettings();

	const { clearFieldError } = useLevelsValidation();

	const handleLevelFieldChange = (
		levelId: string,
		field: LevelField,
		value: number,
		type: 'blind' | 'break',
	) => {
		if (type === 'blind') {
			updateBlindLevel(levelId, field, value);
			clearFieldError(levelId, field, value);
		} else if (type === 'break') {
			updateBreakLevel(levelId, value);
			clearFieldError(levelId, field, value);
		}
	};

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
							<div className={styles.fieldsRow}>
								<Input
									label='Big Blind:'
									onChange={(e) =>
										handleLevelFieldChange(
											level.id,
											'bigBlind',
											+e.target.value,
											level.type,
										)
									}
									value={getBlindValue('bigBlind', level.id)}
									error={!!levelsErrors[level.id]?.bigBlind}
									warningText={levelsErrors[level.id]?.bigBlind}
								/>
								<Input
									label='Small Blind:'
									onChange={(e) =>
										handleLevelFieldChange(
											level.id,
											'smallBlind',
											+e.target.value,
											level.type,
										)
									}
									value={getBlindValue('smallBlind', level.id)}
									error={!!levelsErrors[level.id]?.smallBlind}
									warningText={levelsErrors[level.id]?.smallBlind}
								/>
							</div>
							<div className={styles.fieldsRow}>
								<Input
									label='Ante:'
									onChange={(e) =>
										handleLevelFieldChange(
											level.id,
											'ante',
											+e.target.value,
											level.type,
										)
									}
									value={getBlindValue('ante', level.id)}
									error={!!levelsErrors[level.id]?.ante}
									warningText={levelsErrors[level.id]?.ante}
								/>
								<Input
									label='Duration:'
									onChange={(e) =>
										handleLevelFieldChange(
											level.id,
											'duration',
											+e.target.value,
											level.type,
										)
									}
									value={getBlindValue('duration', level.id)}
									error={!!levelsErrors[level.id]?.duration}
									warningText={levelsErrors[level.id]?.duration}
								/>
							</div>
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
					<div
						className={styles.breakSettings}
						key={level.id}
						id={`settings-${level.id}`}
					>
						<Input
							label='Break Duration:'
							onChange={(e) =>
								handleLevelFieldChange(
									level.id,
									'duration',
									+e.target.value,
									level.type,
								)
							}
							value={getBreakValue(level.id)}
							error={!!levelsErrors[level.id]?.duration}
							warningText={levelsErrors[level.id]?.duration}
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
