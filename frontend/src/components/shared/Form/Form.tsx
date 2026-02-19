import styles from './Form.module.scss';
import Button from '../Button/Button';
import TopSettingsSection from './TopSettingsSection/TopSettingsSection';
import BlindsSettingsSection from './BlindsSettingsSection/BlindsSettingsSection';
import { useEffect, useRef } from 'react';
import { useTimerSettings } from '../../../store/TimerSettings/useTimerSettings';
import { useSubmit } from '../../../hooks/useSubmit';
import { usePokerSettings } from '../../../store/PokerSettings/usePokerSettings';

type FormProps = {
	title: 'Custom Settings' | 'Save Settings';
};

const Form = ({ title }: FormProps) => {
	const { levels, addNewLevel, isWarningMessageVisible, levelsErrors } =
		useTimerSettings();
	const { validationErrors } = usePokerSettings();

	const containerRef = useRef<HTMLDivElement>(null);
	const prevLenghtRef = useRef<number>(levels.length);

	useEffect(() => {
		if (levels.length > prevLenghtRef.current) {
			if (containerRef.current) {
				containerRef.current.scrollTop = containerRef.current.scrollHeight;
			}
		}

		prevLenghtRef.current = levels.length;
	}, [levels]);

	useEffect(() => {
		if (!containerRef.current) return;

		const firstTopError = Object.keys(validationErrors)[0];

		if (firstTopError) {
			const element = containerRef.current.querySelector(`#${firstTopError}`);

			element?.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});

			return;
		}

		const firstErrorLevel = levels.find((level) => levelsErrors[level.id]);

		if (!firstErrorLevel) return;

		const element = containerRef.current.querySelector(
			`#settings-${firstErrorLevel.id}`,
		);

		element?.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	}, [validationErrors, levelsErrors, levels]);

	const submit = useSubmit();

	const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		submit();
	};

	return (
		<div ref={containerRef} className={styles.container}>
			<form className={styles.form} onSubmit={submitForm} noValidate>
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
