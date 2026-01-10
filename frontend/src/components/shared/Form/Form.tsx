import styles from './Form.module.scss';
import Button from '../Button/Button';
import TopSettingsSection from './TopSettingsSection/TopSettingsSection';
import BlindsSettingsSection from './BlindsSettingsSection/BlindsSettingsSection';
import { useEffect, useRef } from 'react';
import { useTimerSettings } from '../../../store/TimerSettings/useTimerSettings';
import { useSubmit } from '../../../hooks/useSubmit';

type FormProps = {
	title: 'Custom Settings' | 'Save Settings';
};

const Form = ({ title }: FormProps) => {
	const { levels, addNewLevel, isWarningMessageVisible } = useTimerSettings();

	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	}, [levels]);

	const submitTopSettings = useSubmit();

	const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		submitTopSettings();
	};

	return (
		<div ref={containerRef} className={styles.container}>
			<form className={styles.form} onSubmit={submitForm}>
				<h2 className={styles.title}>{title}</h2>

				<TopSettingsSection />

				<h2 className={styles.subtitle}>Blinds Settings</h2>

				<BlindsSettingsSection />

				{isWarningMessageVisible && (
					<p className={styles.warningMessage}>
						You must have at least one blind level
					</p>
				)}

				<div className={styles.buttons}>
					<Button
						size='big'
						onClick={() => {
							addNewLevel('blind');
						}}
					>
						Add Blind
					</Button>

					<Button
						size='big'
						onClick={() => {
							addNewLevel('break');
						}}
					>
						Add Break
					</Button>

					<Button size='big' type='submit'>
						Save
					</Button>
				</div>
			</form>
		</div>
	);
};

export default Form;
