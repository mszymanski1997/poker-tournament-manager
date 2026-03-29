import styles from './AdvancedSettings.module.scss';
import Input from '../../FormElements/Input';
import Button from '../../Button/Button';
import { IoIosArrowDown } from 'react-icons/io';
import { usePokerSettings } from '../../../../store/PokerSettings/usePokerSettings';
import { useEffect, useState } from 'react';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import { useTimerSettings } from '../../../../store/TimerSettings/useTimerSettings';

const AdvancedSettings = () => {
	const isOpenStorage = useLocalStorage<boolean>('isOpen');

	const [isOpen, setIsOpen] = useState(() => {
		return isOpenStorage.getValueWithExpiry() ?? false;
	});

	const { totalTournamentDuration } = useTimerSettings();

	const toggleAdvanced = () => {
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		if (isOpen) {
			isOpenStorage.setValueWithExpiry(isOpen, totalTournamentDuration);
		} else {
			localStorage.removeItem('isOpen');
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	const {
		handleDisableAddons,
		handleDisableRake,
		handleEnableAddons,
		handleEnableRake,
		updateNestedSetting,
		settings,
		validationErrors,
	} = usePokerSettings();

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
				{settings.rake.enable ? (
					<div className={styles.advancedSettingsInputContainer}>
						<div className={styles.inputContainer}>
							<Input
								label='Percent of rake:'
								onChange={(e) =>
									updateNestedSetting('rake', 'value', +e.target.value)
								}
								value={settings.rake.value}
								id='rake'
								error={!!validationErrors.rake}
								warningText={validationErrors.rake}
							/>
						</div>
						<Button
							size='big'
							className={`${styles.xButton} ${validationErrors.rake ? styles.buttonWhenErrorMessage : ''}`}
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
								value={settings.addons.value}
								id='addonValue'
								error={!!validationErrors.addonValue}
								warningText={validationErrors.addonValue}
							/>
						</div>
						<div
							className={`${styles.inputContainer} ${validationErrors.addonValue ? styles.inputWhenErrorMessage : ''}`}
						>
							<Input
								label='Addons:'
								onChange={(e) =>
									updateNestedSetting('addons', 'count', +e.target.value)
								}
								value={settings.addons.count}
							/>
						</div>
						<Button
							size='big'
							className={`${styles.xButton} ${validationErrors.rake ? styles.buttonWhenErrorMessage : ''}`}
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
		</>
	);
};

export default AdvancedSettings;
