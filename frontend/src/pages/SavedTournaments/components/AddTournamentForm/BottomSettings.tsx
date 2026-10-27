import styles from '../../../../components/shared/Form/BlindsSettingsSection/BlindsSettingsSection.module.scss';
import Button from '../../../../components/shared/Button/Button';
import Input from '../../../../components/shared/FormElements/Input';
import { useSavedTournament } from '../../store/useSavedTournament';

const BottomSettings = () => {
	const { savedTournament } = useSavedTournament();

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
								<Input label='Big Blind:' />
								<Input label='Small Blind:' />
							</div>
							<div className={styles.fieldsRow}>
								<Input label='Ante:' />
								<Input label='Duration:' />
							</div>
							<Button className={styles.xButton}>X</Button>
						</div>
					);
				}

				return (
					<div
						className={styles.breakSettings}
						key={level.id}
						id={`settings-${level.id}`}
					>
						<Input label='Break Duration:' />
						<Button className={styles.xButton}>X</Button>
					</div>
				);
			})}
		</>
	);
};

export default BottomSettings;
