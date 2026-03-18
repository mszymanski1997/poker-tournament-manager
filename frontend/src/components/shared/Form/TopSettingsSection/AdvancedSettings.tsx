import { useState } from 'react';
import styles from './AdvancedSettings.module.scss';
import Input from '../../FormElements/Input';
import Button from '../../Button/Button';

const AdvancedSettings = () => {
	const [isRake, setIsRake] = useState<boolean>(false);
	const [isAddonAvailable, setIsAddonAvailable] = useState<boolean>(false);

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
						onClick={() => setIsRake(false)}
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
						onChange={() => setIsRake(true)}
					/>
				</div>
			)}

			{isAddonAvailable ? (
				<div className={styles.advancedSettingsInputContainer}>
					<div className={styles.inputContainer}>
						<Input label='Addon value:' />
					</div>
					<Button
						size='big'
						className={styles.xButton}
						onClick={() => setIsAddonAvailable(false)}
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
						onChange={() => setIsAddonAvailable(true)}
					/>
				</div>
			)}
		</div>
	);
};

export default AdvancedSettings;
