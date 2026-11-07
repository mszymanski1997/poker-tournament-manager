import styles from '../../../../components/shared/Form/TopSettingsSection/AdvancedSettings.module.scss';
import Input from '../../../../components/shared/FormElements/Input';
import Button from '../../../../components/shared/Button/Button';
import { IoIosArrowDown } from 'react-icons/io';
import { useState } from 'react';
import { useSavedTournament } from '../../store/useSavedTournament';

const AdvancedSettings = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleAdvanced = () => {
		setIsOpen((prev) => !prev);
	};

	const {
		savedTournament,
		setAddonsEnabled,
		setRakeEnabled,
		setSettingDisabled,
		updateNestedSetting,
	} = useSavedTournament();

	return (
		<>
			<div onClick={toggleAdvanced} className={styles.advancedSettingsToggler}>
				<p>Advanced settings</p>
				<IoIosArrowDown
					className={`${styles.arrow} ${isOpen ? styles.rotate : ''}`}
				/>
			</div>

			<div
				className={`${styles.advancedSettingsContainer} ${isOpen ? styles.open : ''}`}
			>
				{savedTournament.rake ? (
					<div className={styles.advancedSettingsInputContainer}>
						<div className={styles.inputContainer}>
							<Input
								label='Percent of rake:'
								id='rake'
								onChange={(e) => updateNestedSetting('rake', +e.target.value)}
							/>
						</div>
						<Button
							size='big'
							className={styles.xButton}
							onClick={() => {
								setSettingDisabled('rake');
							}}
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
							onChange={setRakeEnabled}
						/>
					</div>
				)}

				{savedTournament.addons ? (
					<div
						className={`${styles.advancedSettingsInputContainer} ${styles.addonContainer}`}
					>
						<div className={styles.inputContainer}>
							<Input
								label='Addon value:'
								id='addonValue'
								onChange={(e) => updateNestedSetting('addons', +e.target.value)}
							/>
						</div>
						<Button
							size='big'
							className={`${styles.xButton} `}
							onClick={() => {
								setSettingDisabled('addons');
							}}
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
							onClick={setAddonsEnabled}
						/>
					</div>
				)}
			</div>
		</>
	);
};

export default AdvancedSettings;
