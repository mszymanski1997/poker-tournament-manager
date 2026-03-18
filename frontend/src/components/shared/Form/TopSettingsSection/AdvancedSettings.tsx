import styles from './AdvancedSettings.module.scss';
import Input from '../../FormElements/Input';
import Button from '../../Button/Button';
import { usePokerSettings } from '../../../../store/PokerSettings/usePokerSettings';

const AdvancedSettings = () => {
	const {
		isRake,
		isAddonAvailable,
		handleDisableAddons,
		handleDisableRake,
		handleEnableAddons,
		handleEnableRake,
	} = usePokerSettings();

	return (
		<div className={styles.advancedSettingsContainer}>
			{isRake ? (
				<div className={styles.advancedSettingsInputContainer}>
					<div className={styles.inputContainer}>
						<Input label='Percent of rake:' />
					</div>
					<Button
						size='big'
						className={styles.xButton}
						onClick={handleDisableRake}
					>
						X
					</Button>
				</div>
			) : (
				<div className={styles.advancedSettingQuestion}>
					<p className={styles.question}>Does the organizer take a rake?</p>
					<input
						type='checkbox'
						className={styles.checkbox}
						onChange={handleEnableRake}
					/>
				</div>
			)}

			{isAddonAvailable ? (
				<div
					className={`${styles.advancedSettingsInputContainer} ${styles.addonContainer}`}
				>
					<div className={styles.inputContainer}>
						<Input label='Addon value:' />
					</div>
					<div className={styles.inputContainer}>
						<Input label='Addons:' />
					</div>
					<Button
						size='big'
						className={styles.xButton}
						onClick={handleDisableAddons}
					>
						X
					</Button>
				</div>
			) : (
				<div className={styles.advancedSettingQuestion}>
					<p className={styles.question}>Are add-ons available?</p>
					<input
						type='checkbox'
						className={styles.checkbox}
						onChange={handleEnableAddons}
					/>
				</div>
			)}
		</div>
	);
};

export default AdvancedSettings;
