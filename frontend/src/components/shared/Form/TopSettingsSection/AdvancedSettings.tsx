import styles from './AdvancedSettings.module.scss';

const AdvancedSettings = () => {
	return (
		<div className={styles.advancedSettingsContainer}>
			<div className={styles.advancedSetting}>
				<p className={styles.question}>Does the organizer take a rake?</p>
				<input type='checkbox' className={styles.checkbox} />
			</div>
			<div className={styles.advancedSetting}>
				<p className={styles.question}>Are add-ons available?</p>
				<input type='checkbox' className={styles.checkbox} />
			</div>
		</div>
	);
};

export default AdvancedSettings;
