import styles from '../../../../components/shared/Form/BlindsSettingsSection/BlindsSettingsSection.module.scss';
import Button from '../../../../components/shared/Button/Button';
import Input from '../../../../components/shared/FormElements/Input';
import { useSavedTournament } from '../../store/useSavedTournament';

const BottomSettings = () => {
	const { savedTournament, removeLevel, updateLevel } = useSavedTournament();

	return (
		<>
			{savedTournament.levels.map((level) => {
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
										updateLevel(level.id as string, 'bigBlind', +e.target.value)
									}
								/>
								<Input
									label='Small Blind:'
									onChange={(e) =>
										updateLevel(
											level.id as string,
											'smallBlind',
											+e.target.value,
										)
									}
								/>
							</div>
							<div className={styles.fieldsRow}>
								<Input
									label='Ante:'
									onChange={(e) =>
										updateLevel(level.id as string, 'ante', +e.target.value)
									}
								/>
								<Input
									label='Duration:'
									onChange={(e) =>
										updateLevel(level.id as string, 'duration', +e.target.value)
									}
								/>
							</div>
							<Button
								className={styles.xButton}
								onClick={() => removeLevel(level.id as string)}
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
								updateLevel(level.id as string, 'duration', +e.target.value)
							}
						/>
						<Button
							className={styles.xButton}
							onClick={() => removeLevel(level.id as string)}
						>
							X
						</Button>
					</div>
				);
			})}
		</>
	);
};

export default BottomSettings;
