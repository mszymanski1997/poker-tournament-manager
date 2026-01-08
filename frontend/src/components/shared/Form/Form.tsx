import styles from './Form.module.scss';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { useEffect, useRef } from 'react';
import { usePokerSettings } from '../../../store/PokerSettings/usePokerSettings';
import { useTimerSettings } from '../../../store/TimerSettings/useTimerSettings';

type FormProps = {
	title: 'Custom Settings' | 'Save Settings';
};

const Form = ({ title }: FormProps) => {
	const {
		levels,
		addNewLevel,
		removeLevel,
		updateBlindLevel,
		updateBreakLevel,
		getBlindValue,
		getBreakValue,
		isWarningMessageVisible,
	} = useTimerSettings();

	const {
		setStartingStack,
		setBuyInValue,
		setBuyInsCount,
		setPlayersInCount,
		setRebuysCount,
		settings,
	} = usePokerSettings();

	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	}, [levels]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		setSetting: (value: number) => void,
		minValue: number = 0
	) => {
		const value = Math.max(minValue, +e.target.value);

		setSetting(value);
	};

	return (
		<div ref={containerRef} className={styles.container}>
			<form className={styles.form}>
				<h2 className={styles.title}>{title}</h2>

				<div className={styles.separator}>
					<Input
						label='Starting stack'
						onChange={(e) => handleChange(e, setStartingStack, 1)}
						minValue={1}
						value={settings.startingStack}
					/>
					<Input
						label='Buy-In value:'
						onChange={(e) => handleChange(e, setBuyInValue)}
						value={settings.buyInValue}
					/>
				</div>

				<div className={styles.separator}>
					<Input
						label='Buy-ins:'
						onChange={(e) => handleChange(e, setBuyInsCount)}
						value={settings.buyIns}
					/>
					<Input
						label='Rebuys:'
						onChange={(e) => handleChange(e, setRebuysCount)}
						value={settings.rebuys}
					/>
				</div>

				<Input
					label='Players-In:'
					onChange={(e) => handleChange(e, setPlayersInCount)}
					value={settings.playersIn}
				/>

				<h2 className={styles.subtitle}>Blinds Settings</h2>

				{levels.map((level) => {
					if (level.type === 'blind') {
						return (
							<div
								className={styles.blindsSettings}
								key={level.id}
								id={`settings-${level.id}`}
							>
								<Input
									label='Big Blind:'
									onChange={(e) => {
										updateBlindLevel(level.id, 'bigBlind', +e.target.value);
									}}
									value={getBlindValue('bigBlind', level.id)}
								/>
								<Input
									label='Small Blind:'
									onChange={(e) => {
										updateBlindLevel(level.id, 'smallBlind', +e.target.value);
									}}
									value={getBlindValue('smallBlind', level.id)}
								/>
								<Input
									label='Ante:'
									onChange={(e) => {
										updateBlindLevel(level.id, 'ante', +e.target.value);
									}}
									value={getBlindValue('ante', level.id)}
								/>
								<Input
									label='Duration:'
									onChange={(e) => {
										updateBlindLevel(level.id, 'duration', +e.target.value);
									}}
									value={getBlindValue('duration', level.id)}
								/>
								<Button
									className={styles.xButton}
									onClick={() => removeLevel(level.id)}
								>
									X
								</Button>
							</div>
						);
					}

					return (
						<div className={styles.breakSettings} key={level.id}>
							<Input
								label='Break Duration:'
								id={`break-duration-${level.id}`}
								onChange={(e) => updateBreakLevel(level.id, +e.target.value)}
								value={getBreakValue(level.id)}
							/>
							<Button
								className={styles.xButton}
								onClick={() => removeLevel(level.id)}
							>
								X
							</Button>
						</div>
					);
				})}

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

					<Button size='big'>Save</Button>
				</div>
			</form>
		</div>
	);
};

export default Form;
