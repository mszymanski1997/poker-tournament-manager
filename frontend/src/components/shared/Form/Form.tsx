import styles from './Form.module.scss';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { useEffect, useState } from 'react';

type FormProps = {
	title: 'Custom Settings' | 'Save Settings';
};

type SettingItem = {
	id: string;
	type: 'blind' | 'break';
};

const Form = ({ title }: FormProps) => {
	const [settingsInputs, setSettingsInputs] = useState<SettingItem[]>([
		{ id: crypto.randomUUID(), type: 'blind' },
	]);

	const removeSettings = (id: string) => {
		setSettingsInputs(settingsInputs.filter((setting) => setting.id !== id));
	};

	useEffect(() => {
		console.log('settingsInputs changed:', settingsInputs);
	}, [settingsInputs]);

	return (
		<form className={styles.form}>
			<h2 className={styles.title}>{title}</h2>

			<div className={styles.separator}>
				<Input text='Starting stack' id='starting-stack' />
				<Input text='Buy-In value:' id='buy-in-value' />
			</div>

			<div className={styles.separator}>
				<Input text='Buy-ins:' id='buy-ins' />
				<Input text='Rebuys:' id='rebuys' />
			</div>

			<Input text='Players-In:' id='players-in' />

			<h2 className={styles.subtitle}>Blinds Settings</h2>

			{settingsInputs.map((setting) => {
				if (setting.type === 'blind') {
					return (
						<div
							className={styles.blindsSettings}
							key={setting.id}
							id={`settings-${setting.id}`}
						>
							<Input text='Big Blind:' id={`big-blind-${setting.id}`} />
							<Input text='Small Blind:' id={`small-blind-${setting.id}`} />
							<Input text='Ante:' id={`ante-${setting.id}`} />
							<Input text='Duration:' id={`duration-${setting.id}`} />
							<Button
								className={styles.xButton}
								onClick={() => removeSettings(setting.id)}
							>
								X
							</Button>
						</div>
					);
				} else {
					return (
						<div
							className={styles.breakSettings}
							key={setting.id}
							id={`settings-${setting.id}`}
						>
							<Input
								text='Break Duration:'
								id={`break-duration-${setting.id}`}
							/>
							<Button
								className={styles.xButton}
								onClick={() => removeSettings(setting.id)}
							>
								X
							</Button>
						</div>
					);
				}
			})}

			<div className={styles.buttons}>
				<Button
					big
					onClick={() => {
						setSettingsInputs((prev) => [
							...prev,
							{ id: crypto.randomUUID(), type: 'blind' },
						]);
					}}
				>
					Add Blind
				</Button>

				<Button
					big
					onClick={() => {
						setSettingsInputs((prev) => [
							...prev,
							{ id: crypto.randomUUID(), type: 'break' },
						]);
					}}
				>
					Add Break
				</Button>

				<Button big>Save</Button>
			</div>
		</form>
	);
};

export default Form;
