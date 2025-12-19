import styles from './Form.module.scss';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { useEffect, useRef, useState } from 'react';
import { usePokerSettings } from '../../../store/PokerSettings/usePokerSettings';

type FormProps = {
	title: 'Custom Settings' | 'Save Settings';
};

type SettingItem = {
	id: string;
	type: 'blind' | 'break';
};

const Form = ({ title }: FormProps) => {
	const {
		setStartingStack,
		setBuyInValue,
		setBuyInsCount,
		setPlayersInCount,
		setRebuysCount,
		settings,
	} = usePokerSettings();

	const containerRef = useRef<HTMLDivElement>(null);

	const [settingsInputs, setSettingsInputs] = useState<SettingItem[]>([
		{ id: crypto.randomUUID(), type: 'blind' },
	]);

	const addNewSettings = (setting: 'blind' | 'break') => {
		setSettingsInputs((prev) => [
			...prev,
			{ id: crypto.randomUUID(), type: setting },
		]);
	};

	const removeSettings = (id: string) => {
		setSettingsInputs(settingsInputs.filter((setting) => setting.id !== id));
	};

	useEffect(() => {
		console.log('settingsInputs changed:', settingsInputs);

		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	}, [settingsInputs]);

	return (
		<div ref={containerRef} className={styles.container}>
			<form className={styles.form}>
				<h2 className={styles.title}>{title}</h2>

				<div className={styles.separator}>
					<Input
						label='Starting stack'
						id='starting-stack'
						setSetting={setStartingStack}
						minValue={1}
						value={settings.startingStack}
					/>
					<Input
						label='Buy-In value:'
						id='buy-in-value'
						setSetting={setBuyInValue}
						value={settings.buyInValue}
					/>
				</div>

				<div className={styles.separator}>
					<Input
						label='Buy-ins:'
						id='buy-ins'
						setSetting={setBuyInsCount}
						value={settings.buyIns}
					/>
					<Input
						label='Rebuys:'
						id='rebuys'
						setSetting={setRebuysCount}
						value={settings.rebuys}
					/>
				</div>

				<Input
					label='Players-In:'
					id='players-in'
					setSetting={setPlayersInCount}
					value={settings.playersIn}
				/>

				<h2 className={styles.subtitle}>Blinds Settings</h2>

				{settingsInputs.map((setting) => {
					if (setting.type === 'blind') {
						return (
							<div
								className={styles.blindsSettings}
								key={setting.id}
								id={`settings-${setting.id}`}
							>
								<Input label='Big Blind:' id={`big-blind-${setting.id}`} />
								<Input label='Small Blind:' id={`small-blind-${setting.id}`} />
								<Input label='Ante:' id={`ante-${setting.id}`} />
								<Input label='Duration:' id={`duration-${setting.id}`} />
								<Button
									className={styles.xButton}
									onClick={() => removeSettings(setting.id)}
								>
									X
								</Button>
							</div>
						);
					}

					return (
						<div
							className={styles.breakSettings}
							key={setting.id}
							id={`settings-${setting.id}`}
						>
							<Input
								label='Break Duration:'
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
				})}

				<div className={styles.buttons}>
					<Button
						size='big'
						onClick={() => {
							addNewSettings('blind');
						}}
					>
						Add Blind
					</Button>

					<Button
						size='big'
						onClick={() => {
							addNewSettings('break');
						}}
					>
						Add Break
					</Button>

					<Button size='big'>Save</Button>
				</div>
			</form>
		</div>
	);
};

export default Form;

