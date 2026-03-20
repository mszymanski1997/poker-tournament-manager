import styles from './AdvancedSettings.module.scss';
import Input from '../../FormElements/Input';
import Button from '../../Button/Button';
import { usePokerSettings } from '../../../../store/PokerSettings/usePokerSettings';

const AdvancedSettings = () => {
	const {
		handleDisableAddons,
		handleDisableRake,
		handleEnableAddons,
		handleEnableRake,
		updateNestedSetting,
		settings,
	} = usePokerSettings();

	return (
		<div className={styles.advancedSettingsContainer}>
			{settings.rake.enable ? (
				<div className={styles.advancedSettingsInputContainer}>
					<div className={styles.inputContainer}>
						<Input
							label='Percent of rake:'
							onChange={(e) =>
								updateNestedSetting('rake', 'value', +e.target.value)
							}
						/>
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

			{settings.addons.enable ? (
				<div
					className={`${styles.advancedSettingsInputContainer} ${styles.addonContainer}`}
				>
					<div className={styles.inputContainer}>
						<Input
							label='Addon value:'
							onChange={(e) =>
								updateNestedSetting('addons', 'value', +e.target.value)
							}
						/>
					</div>
					<div className={styles.inputContainer}>
						<Input
							label='Addons:'
							onChange={(e) =>
								updateNestedSetting('addons', 'count', +e.target.value)
							}
						/>
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
